const fs = require("fs");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

// ---------- Sanitiser ----------
const DEFAULT_SUFFIXES = new Set([
  "jr", "jr.", "sr", "sr.", "ii", "iii", "iv", "v", "phd", "md"
]);

function stripAccents(str) {
  let result = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Explicit replacements for letters not handled by NFD
  const replacements = {
    "Ø": "O", "ø": "o",
    "Å": "A", "å": "a",
    "Ä": "A", "ä": "a",
    "Æ": "AE", "æ": "ae",
    "Ö": "O", "ö": "o",
    "Ü": "U", "ü": "u",
    "Ç": "C", "ç": "c",
    "Ł": "L", "ł": "l",
    "İ": "I", "ı": "i"
  };

  result = result.replace(/./g, c => replacements[c] || c);

  return result;
}

function sanitisePlayers(list, { suffixes = DEFAULT_SUFFIXES } = {}) {
  const clean = [];
  const excluded = [];

  for (const raw of list) {
    if (!raw || typeof raw !== "string") {
      excluded.push(`${raw ?? "<null>"} — discarded: not a string`);
      continue;
    }

    const trimmed = raw.trim().replace(/[,.]+$/g, "");

    // Exclude names containing "O'"
    if (/O'/i.test(trimmed)) {
      excluded.push(`${trimmed} — discarded: contains "O'"`);
      continue;
    }

    // Exclude names containing "Al" as a word
    if (/\bAl\b/i.test(trimmed)) {
      excluded.push(`${trimmed} — discarded: contains "Al"`);
      continue;
    }

    if (trimmed === "") {
      excluded.push(`${raw} — discarded: empty after trim`);
      continue;
    }

    const spaceCount = (trimmed.match(/\s+/g) || []).length;

    if (spaceCount > 1) {
      excluded.push(`${trimmed} — discarded: too many words`);
      continue;
    }

    const parts = trimmed.split(/\s+/);
    let last = parts[parts.length - 1];

    if (suffixes.has(last.toLowerCase()) && parts.length >= 2) {
      last = parts[parts.length - 2];
    }

    // Normalize letters
    let cleanName = stripAccents(last);

    // Remove any leading/trailing non-alphanumeric characters
    cleanName = cleanName.replace(/^[^A-Za-z0-9]+|[^A-Za-z0-9]+$/g, "");

    // Exclude names with symbols we cannot safely convert
    if (/[^A-Z0-9]/i.test(cleanName)) {
      excluded.push(`${trimmed} — discarded: contains invalid characters`);
      continue;
    }

    // CAPITALIZE full last name
    cleanName = cleanName.toUpperCase();

    if (cleanName) clean.push({ last: cleanName, original: trimmed });
    else excluded.push(`${trimmed} — discarded: empty after cleaning`);
  }

  return { clean, excluded };
}
// ---------- End sanitiser ----------


// ---------- Main ----------
async function main() {
  const db = await open({
    filename: "./players.db",
    driver: sqlite3.Database
  });

  const rows = await db.all("SELECT PlayerName FROM players");
  const names = rows.map(r => r.PlayerName);

  const { clean, excluded } = sanitisePlayers(names);

  // Optional manual additions
  let manual = [];
  if (fs.existsSync("manual.txt")) {
    manual = fs
      .readFileSync("manual.txt", "utf-8")
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(name => ({ last: stripAccents(name).toUpperCase(), original: name }));
  }

  // Combine clean + manual
  const allCombined = [...clean, ...manual];

  // Deduplicate and count duplicates
  const seen = new Set();
  const uniqueClean = [];
  let duplicatesCount = 0;

  for (const e of allCombined) {
    if (seen.has(e.last)) {
      duplicatesCount++;
      continue;
    }
    seen.add(e.last);
    uniqueClean.push(e);
  }

  // Determine longest last name for alignment
  const maxLength = uniqueClean.reduce((max, e) => Math.max(max, e.last.length), 0);

  // Generate JS array with aligned comments
  const jsLines = uniqueClean.map(
    e => `  "${e.last}",${" ".repeat(maxLength - e.last.length)}   // ${e.original}`
  );
  const jsContent = `const players = [\n${jsLines.join("\n")}\n];\nmodule.exports = players;\n`;

  fs.writeFileSync("players.js", jsContent, "utf-8");

  // Write all excluded names with reason
  const excludedContent = excluded.join("\n") + "\n";
  fs.writeFileSync("excluded.txt", excludedContent, "utf-8");

  // ---------- Final sanity check ----------
  const totalNames = names.length;
  const totalProcessed = uniqueClean.length + excluded.length + duplicatesCount;
  const difference = totalNames - totalProcessed;

  console.log(`✅ Wrote ${uniqueClean.length} names to players.js with aligned comments`);
  console.log(`⚠️  Logged ${excluded.length} excluded names with reasons to excluded.txt`);
  console.log(`📝  Merged ${manual.length} manual names from manual.txt`);
  console.log(`🔁  Filtered out ${duplicatesCount} duplicate names`);

  console.log("\n--- Sanity Check ---");
  console.log(`Total names retrieved from DB: ${totalNames}`);
  console.log(`Included names: ${uniqueClean.length}`);
  console.log(`Excluded names: ${excluded.length}`);
  console.log(`Duplicates removed: ${duplicatesCount}`);
  console.log(`Sum of included + excluded + duplicates: ${totalProcessed}`);

  if (difference === 0) {
    console.log("✅ Counts match database row total!");
  } else {
    console.warn(`⚠️ Counts do NOT match database row total! Off by ${Math.abs(difference)} name(s)`);
  }

  await db.close();
}

main().catch(console.error);
