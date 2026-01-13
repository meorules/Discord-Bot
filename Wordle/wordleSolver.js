#!/usr/bin/env node
const players = require('./players');

function parseCli() {
  const raw = {};
  process.argv.slice(2).forEach(arg => {
    if (!arg.startsWith('--')) return;
    const idx = arg.indexOf('=');
    if (idx === -1) raw[arg.slice(2)] = true;
    else raw[arg.slice(2, idx)] = arg.slice(idx + 1);
  });
  return raw;
}

function parseAbsent(s) {
  if (!s) return [];
  if (s.includes(',') || s.includes(' ')) return s.split(/[,\s]+/).map(x => x.toUpperCase()).filter(Boolean);
  return s.toUpperCase().split('').filter(Boolean);
}

function parsePresent(s) {
  // format: "A:1,3;B:2" (positions are 1-based and are positions the letter CANNOT be in)
  const out = {};
  if (!s) return out;
  s.split(';').map(entry => entry.trim()).filter(Boolean).forEach(entry => {
    const parts = entry.split(':');
    const letter = parts[0].toUpperCase();
    const posstr = parts[1] || '';
    const positions = posstr.split(',').map(p => {
      const n = parseInt(p, 10);
      return Number.isNaN(n) ? null : (n - 1);
    }).filter(x => x !== null && x >= 0);
    out[letter] = positions;
  });
  return out;
}

function usage() {
  console.log('Usage: node wordleSolver.js --length=5 [--absent=ABC|A,B] [--pattern=.A..E] [--present=A:1,3;B:2]');
  console.log('\nOptions:');
  console.log('  --length    Number of letters in the target word');
  console.log('  --absent    Letters known NOT to be present (either contiguous or comma-separated)');
  console.log('  --pattern   Confirmed positions, use . or _ for unknown (length must match)');
  console.log('  --present   Letters that ARE present but NOT in the listed positions. Format: "A:1,3;B:2" (1-based)');
}

function filterWords({ length, absentLetters, pattern, presentExcluded }) {
  const L = length ? Number(length) : null;
  const absentSet = new Set(absentLetters || []);
  const pres = presentExcluded || {};

  return players.filter(p => {
    const word = String(p).toUpperCase();
    if (L && word.length !== L) return false;

    if (pattern) {
      if (pattern.length !== word.length) return false;
      for (let i = 0; i < pattern.length; i++) {
        const ch = pattern[i];
        if (ch === '.' || ch === '_') continue;
        if (ch.toUpperCase() !== word[i]) return false;
      }
    }

    for (const a of absentSet) {
      if (!a) continue;
      if (word.includes(a)) return false;
    }

    for (const letter of Object.keys(pres)) {
      if (!word.includes(letter)) return false; // letter must be present somewhere
      const forbidden = pres[letter] || [];
      for (const pos of forbidden) {
        if (pos >= 0 && pos < word.length && word[pos] === letter) return false;
      }
    }

    return true;
  });
}

function main() {
  const argv = parseCli();
  if (!argv.length) {
    usage();
    process.exit(1);
  }

  const length = parseInt(argv.length, 10);
  if (Number.isNaN(length) || length <= 0) {
    console.error('Invalid --length value');
    process.exit(2);
  }

  const absentLetters = parseAbsent(argv.absent || '');
  const pattern = argv.pattern ? argv.pattern.toUpperCase() : null;
  const presentExcluded = parsePresent(argv.present || '');

  const matches = filterWords({ length, absentLetters, pattern, presentExcluded });

  console.log(`Found ${matches.length} match(es)`);
  if (matches.length > 0) console.log(matches.join('\n'));
}

if (require.main === module) main();

//Example usage:
//node .\Wordle\wordleSolver.js --length=7 --pattern='.....E.' --present='A:2,3,4;I:1,5;C:2' --absent='G,B,R,N,S,L,M,T'