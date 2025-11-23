const sqlite3 = require('sqlite3');
const fs = require('node:fs');
const csv = require('csv-parser');

const Player = require('./Main/modules/Player.js');
const CardType = require('./Main/modules/cardType.js');

const db = new sqlite3.Database("botDB.db");

const playerArrays = require('./Main/countrycodes.js');

countryCodes = playerArrays.countryAlphaCodeDictionary;

async function updateTables() {

    for (const [country, code] of Object.entries(countryCodes)) {
    await db.run(
        'UPDATE Players SET Country = ? WHERE Country = ?; COMMIT;',
        [country,code.toLowerCase()]
    ,function (){
        console.log(this.changes);
    });
    }

    console.log('Country codes updated successfully!');


    return;
}

function getClubs (){
    const clubsSet = new Set();
    let rowsProcessed = 0;


    db.parallelize(() => {
    db.all('SELECT DISTINCT Team FROM Players ORDER BY Team;', (err, rows) => {
        if (err) {
        console.error('❌ Query error:', err);
        return;
        }

        rows.forEach(row => {
        if (row.Team) clubsSet.add(row.Team.trim());
        rowsProcessed++;
        });

        // After all rows are processed, write to file
        console.log(`Processed ${rowsProcessed} rows.`);

        const clubsArray = Array.from(clubsSet).sort();
        fs.writeFileSync('clubs.txt', clubsArray.join('\n'), 'utf-8');

        console.log(`✅ Wrote ${clubsArray.length} unique clubs to clubs.txt`);
    });
    });

    db.close();
}

function getLeagues (){
    const leagueSet = new Set();
    let rowsProcessed = 0;


    db.parallelize(() => {
    db.all('SELECT DISTINCT League FROM Players ORDER BY League;', (err, rows) => {
        if (err) {
        console.error('❌ Query error:', err);
        return;
        }

        rows.forEach(row => {
        if (row.League) leagueSet.add(row.League.trim());
        rowsProcessed++;
        });

        // After all rows are processed, write to file
        console.log(`Processed ${rowsProcessed} rows.`);

        const leagueArray = Array.from(leagueSet).sort();
        fs.writeFileSync('leagues.txt', leagueArray.join('\n'), 'utf-8');

        console.log(`✅ Wrote ${leagueArray.length} unique clubs to clubs.txt`);
    });
    });

    db.close();
}

async function ReadPlayersFromCSV(filePath) {
    const players = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            const player = new Player(
            "",
            row.PlayerName,
            row.CardTypeID,
            row.Position,
            row.Age,
            row.Rating,
            row.Team,
            "",
            row.Height,
            row.Weight,
            row.Crossing,
            row.Finishing,
            row.Heading,
            row.Jumping,
            row.Penalties,
            row.WeakFoot,
            row.SkillMoves,
            row.Passing,
            row.Defending,
            row.Attacking,
            row.Country,
            row.URL,
            row.Gender,
            0
            );

            players.push(player);
        })
        .on('end', () => resolve(players))
        .on('error', (err) => reject(err));
    });
}

async function AddNewPromoPlayers(fileName){
    let players = await ReadPlayersFromCSV(fileName);
    for(player of players){

        let returnedPlayerID = await Player.InsertPlayer(player);
        //Retrieve the base player ID
        let correspondingPlayer = await Player.RetrievePlayerByName(player.mPlayerName,returnedPlayerID);
        let params = [correspondingPlayer.mID,returnedPlayerID,1];

        await db.run("INSERT INTO PromoPlayers(BasePlayerID,PromoPlayerID,Packable) VALUES(?, ?, ?)",params,function(err){
            if (err) {
                console.error('❌ Query error:', err);
            }
            console.log(this.changes);
            console.log("Inserted into DB " + this.lastID);
        });

    }
}

async function main(){

    //retrievedCardType = await CardType.RetrieveCardTypeByName("Gold");
    //console.log(retrievedCardType);
    fileName = 'C:/Users/Mezor/Documents/Discord Bot/Discord-Bot/Webscraping/CC4 Database - Promo Players5.csv';
    await AddNewPromoPlayers(fileName);
    //retrievedPlayer = await Player.RetrievePlayerByName("Wirt");
    //console.log(retrievedPlayer);

    // retrievedPlayers = await Player.RetrievePlayersByRating("90");
    // retrievedPlayers.forEach(player =>{
    //     console.log(player.name);
    // })

}


main();