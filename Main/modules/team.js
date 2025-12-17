const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const Player = require('./Player.js');


class Team {

    constructor(id,teamName,primaryColour,secondaryColour,discordUsername,autoAddPlayers,balance){
        this.mID = id;
        this.mTeamName = teamName;
        this.mPrimaryColour = primaryColour;
        this.mSecondaryColour = secondaryColour;
        this.mDiscordUsername = discordUsername;
        this.mAutoAddPlayers = autoAddPlayers;
        this.mBalance = balance;
        this.mPlayers = null;
    }

    setAttributes(id,teamName,primaryColour,secondaryColour,discordUsername,autoAddPlayers,players,balance){
        this.mID = id;
        this.mTeamName = teamName;
        this.mPrimaryColour = primaryColour;
        this.mSecondaryColour = secondaryColour;
        this.mDiscordUsername = discordUsername;
        this.mAutoAddPlayers = autoAddPlayers;
        this.mBalance = balance;
        this.mPlayers = players;
    }

    updateBalance(amount){
        if(this.mID != -1){
            this.mBalance += amount;
            Team.EditTeam(this.mDiscordUsername,"Balance",this.mBalance);
        }
    }


    stringify(options,balance){
        let stringToReturn = "Invalid Team";
        if(this.mID != -1){

            stringToReturn = this.mTeamName + " " + this.mPrimaryColour + " " + this.mSecondaryColour;

            if(options == true){
                if(this.mAutoAddPlayers){
                    stringToReturn = stringToReturn + " Auto add packed players: :white_check_mark:"
                }else{
                    stringToReturn = stringToReturn + " Auto add packed players: :x:"
                }
            }

            if(balance == true){
                stringToReturn = stringToReturn + "\nBalance: " + this.mBalance;
            }
        }

        return stringToReturn;
    }

    static async RetrieveAllTeams(){
        let db = await ConnectToDB();
        let teamsToReturn = [];
        try{
            const rows = await db.all("SELECT * FROM Teams;", []);
            if(rows){
                for(let row in rows){
                    var teamToReturn = new Team(rows[row].ID,rows[row].TeamName,rows[row].PrimaryColour,rows[row].SecondaryColour,rows[row].DiscordUsername,rows[row].AutoAddPlayers,rows[row].Balance);

                    teamToReturn.mPlayers = [];
                    teamToReturn.mPlayers = await this.RetrieveTeamPlayers(teamToReturn.mID);
                    teamsToReturn.push(teamToReturn);
                }
                
                return teamsToReturn;
            }
            else{
                console.error('❌ Query error:', err);
            }
        }
        catch(err){
            console.error('❌ Query error:', err);
        }
    }

    static async CreateTeam(teamName,primaryColour,secondaryColour, discordUsername){
        let db = await ConnectToDB();
        const result = await db.run("INSERT INTO Teams(TeamName,PrimaryColour,SecondaryColour,DiscordUsername,Balance) VALUES(?,?,?,?,?);",[teamName,primaryColour,secondaryColour,discordUsername,0]);
        return result.lastID;
    }

    static async EditTeam(discordUsername,field,newValue){
        let db = await ConnectToDB();
        var sql = "UPDATE Teams SET " + field + " = ? WHERE DiscordUsername = ?;";
        const result = await db.run(sql,[newValue,discordUsername]);
        return result.changes;
    }

    static async RetrieveTeamByID(id){
    
        let db = await ConnectToDB();

        try{
            const row = await db.get("SELECT * FROM Teams WHERE ID = ? ;", [id]);
            var teamToReturn = new Team(row.ID,row.TeamName,row.PrimaryColour,row.SecondaryColour,row.DiscordUsername,row.AutoAddPlayers,row.Balance);

            teamToReturn.mPlayers = [];
            teamToReturn.mPlayers = await this.RetrieveTeamPlayers(teamToReturn.mID);
            
            return teamToReturn;
        }
        catch(err){
            console.error('❌ Query error:', err);
        }
    }

    static async RetrieveTeamByUser(name){
    
        let db = await ConnectToDB();

        name = '%' + name + '%';
        try{
            const row = await db.get("SELECT * FROM Teams WHERE DiscordUsername Like ? ;", [name]);
            if(row){
            var teamToReturn = new Team(row.ID,row.TeamName,row.PrimaryColour,row.SecondaryColour,row.DiscordUsername,row.AutoAddPlayers,row.Balance);
            teamToReturn.mPlayers = [];
            var playersReturned = await this.RetrieveTeamPlayers(teamToReturn.mID);
            playersReturned.sort(Player.sort);
            teamToReturn.mPlayers = playersReturned;
            return teamToReturn;
            }
            else{
                console.error('Unable to find team');
                return null;
            }
        }
        catch(err){
            console.error('❌ Query error:', err);
        }
    }

    static async RetrieveTeamPlayers(id){
        let db = await ConnectToDB();
        var players = [];

        try{
            const rows = await db.all("SELECT * FROM TeamPlayers WHERE TeamID = ? ;", [id]);

            for(let row in rows){
                var correspondingPlayer = await Player.RetrievePlayerByID(rows[row].PlayerID);
                correspondingPlayer.upgrade(rows[row].Upgrade);
                if(rows[row].Positions){
                    correspondingPlayer.addPosition(rows[row].Positions);
                }
                if(rows[row].Team){
                    correspondingPlayer.mTeam = rows[row].Team;
                }
                if(rows[row].League){
                    correspondingPlayer.mLeague = rows[row].League;
                }
                if(rows[row].CardType){
                    correspondingPlayer.mCardTypeID = rows[row].CardType;
                }
                if(rows[row].Notes){
                    correspondingPlayer.Notes = rows[row].Notes;
                }
                players.push(correspondingPlayer);
            }

            return players;

        }
        catch(err){
            console.error('❌ Query error:', err);
        }
    
    }

    static async RetrieveTeamPlayer(id){
        let db = await ConnectToDB();
        var player;

        try{
            const rows = await db.all("SELECT * FROM TeamPlayers WHERE ID = ? ;", [id]);

            for(let row in rows){
                var correspondingPlayer = await Player.RetrievePlayerByID(rows[row].PlayerID);
                correspondingPlayer.upgrade(rows[row].Upgrade);
                if(rows[row].Positions){
                    correspondingPlayer.addPosition(rows[row].Positions);
                }
                if(rows[row].Team){
                    correspondingPlayer.mTeam = rows[row].Team;
                }
                if(rows[row].League){
                    correspondingPlayer.mLeague = rows[row].League;
                }
                if(rows[row].CardType){
                    correspondingPlayer.mCardTypeID = rows[row].CardType;
                }
                if(rows[row].Notes){
                    correspondingPlayer.Notes = rows[row].Notes;
                }
                player = correspondingPlayer;
            }

            return player;

        }
        catch(err){
            console.error('❌ Query error:', err);
        }
    
    }


    static async AddPlayers(teamID,players){

        let db = await ConnectToDB();

        try{
            let count = 0;
            for(let player in players){
                if(players[player]){
                    let result = await db.run("INSERT INTO TeamPlayers(TeamID,PlayerID,Upgrade) VALUES(?,?,?)",[teamID,players[player].mID,0]);
                    count += result.changes;
                }
                else{
                    throw Error("Player to be added was null");
                }
            }
                return count;
        }
        catch(err){
            console.error('❌ Query error:', err);
        }

    }

    static async AddPlayer(teamID,playerName){

        try{
            let correspondingPlayer = await Player.RetrievePlayerByName(playerName); 
            return await this.AddPlayers(teamID,[correspondingPlayer]);
        }
        catch(err){
            console.error('❌ Query error:', err);
        }

    }

    static async EditPlayerUpgrade(team,playerName,upgrade){
        let db = await ConnectToDB();
        try{

            let playerFound = null;
            let playerFoundIndex = -1;
            for(var player in team.mPlayers){
                    playerFoundIndex++;
                    if(team.mPlayers[player].mPlayerName.toLowerCase().trim().includes(playerName.toLowerCase().trim())){
                        playerFound = team.mPlayers[player];
                       
                        playerFoundIndex=player;
                        break;
                    }
            }
            if(playerFound){
                const row = await db.get("SELECT * FROM TeamPlayers WHERE TeamID = ? AND PlayerID = ? ;", [team.mID,playerFound.mID]);
                
                if(row){
                    playerFound.upgrade(upgrade);
                    const result = await db.run('UPDATE TeamPlayers SET Upgrade = ? WHERE teamID = ? AND PlayerID = ?;',[playerFound.mUpgrade,team.mID,playerFound.mID]);
                    team.mPlayers[playerFoundIndex] = playerFound;
                    return playerFound;
                }
            }
        }
        catch(err){
            console.error('❌ Query error:', err);
        }
    }

    static async EditPlayerTeamOrLeagueOrNote(team,playerName,parameterName,newValue){
        let db = await ConnectToDB();
        try{

            let playerFound = null;
            let playerFoundIndex = -1;
            for(var player in team.mPlayers){
                    playerFoundIndex++;
                    if(team.mPlayers[player].mPlayerName.toLowerCase().trim().includes(playerName.toLowerCase().trim())){
                        playerFound = team.mPlayers[player];
                       
                        playerFoundIndex=player;
                        break;
                    }
            }
            if(playerFound){
                const row = await db.get("SELECT * FROM TeamPlayers WHERE TeamID = ? AND PlayerID = ? ;", [team.mID,playerFound.mID]);
                
                if(row){
                    if(parameterName == "Team"){
                        playerFound.mTeam = newValue;
                        const result = await db.run('UPDATE TeamPlayers SET Team = ? WHERE teamID = ? AND PlayerID = ?;',[newValue, team.mID, playerFound.mID]);
                    }
                    else if(parameterName == "League"){
                        playerFound.mLeague = newValue;
                        const result = await db.run('UPDATE TeamPlayers SET League = ? WHERE teamID = ? AND PlayerID = ?;',[newValue, team.mID, playerFound.mID]);
                    }
                    else if(parameterName == "CardType"){
                        playerFound.mCardTypeID = newValue;
                        const result = await db.run('UPDATE TeamPlayers SET CardType = ? WHERE teamID = ? AND PlayerID = ?;',[newValue, team.mID, playerFound.mID]);
                    }
                    else if(parameterName == "Notes"){
                        playerFound.Notes = newValue;
                        const result = await db.run('UPDATE TeamPlayers SET Notes = ? WHERE teamID = ? AND PlayerID = ?;',[newValue, team.mID, playerFound.mID]);
                    }

                    team.mPlayers[playerFoundIndex] = playerFound;
                    return playerFound;
                }
            }
        }
        catch(err){
            console.error('❌ Query error:', err);
        }
    }

    static async EditPlayerPosition(team,playerName,position){
        let db = await ConnectToDB();
        try{

            var playerFound = null;
            let playerFoundIndex = -1;
            for(var player in team.mPlayers){
                    playerFoundIndex++;
                    if(team.mPlayers[player].mPlayerName.toLowerCase().trim().includes(playerName.toLowerCase().trim())){
                        playerFound = team.mPlayers[player];
                       
                        playerFoundIndex=player;
                        break;
                    }
            }
            if(playerFound){
                const row = await db.get("SELECT * FROM TeamPlayers WHERE TeamID = ? AND PlayerID = ? ;", [team.mID,playerFound.mID]);
                //Add random adjacent position
                if(position == "1"){
                    let positionAdded = playerFound.addRandomAdjacentPosition();
                    let currentPositions;
                    if(row.Positions){
                        currentPositions = row.Positions + " " + positionAdded;
                    }
                    else{
                        currentPositions = positionAdded;
                    }
                    const result = await db.run('UPDATE TeamPlayers SET Positions = ? WHERE teamID = ? AND PlayerID = ?;',[currentPositions,team.mID,playerFound.mID]);
                }
                //Remove all positions
                else if(position == "2"){
                    playerFound.resetPosition(row.Positions);
                    const result = await db.run('UPDATE TeamPlayers SET Positions = "" WHERE teamID = ? AND PlayerID = ?;',[team.mID,playerFound.mID]);
                }
                else{
                    let currentPositions;
                    if(row.Positions){                    
                        if(!row.Positions.includes(position)){
                            playerFound.addPosition(position);
                            currentPositions = row.Positions + " " + position;
                        }
                    }
                    else{
                        currentPositions = position;
                        playerFound.addPosition(position);
                    }                        
                    const result = await db.run('UPDATE TeamPlayers SET Positions = ? WHERE teamID = ? AND PlayerID = ?;',[currentPositions,team.mID,playerFound.mID]);
                }
            }
            console.log(playerFound);
            team.mPlayers[playerFoundIndex] = playerFound;
            return playerFound;
        }
        catch(err){
            console.error('❌ Query error:', err);
        }
    }

    static async TransferPlayer(oldTeam,newTeam,playerName){
        let db = await ConnectToDB();
        try{
            let playerFound = null;
            let playerFoundIndex = -1;
            for(var player in oldTeam.mPlayers){
                    if(oldTeam.mPlayers[player].mPlayerName.toLowerCase().trim().includes(playerName.toLowerCase().trim())){
                        playerFound = oldTeam.mPlayers[player];
                        
                        playerFoundIndex=player;
                        break;
                    }
            }
            if(playerFound){
                const row = await db.get("SELECT * FROM TeamPlayers WHERE TeamID = ? AND PlayerID = ? ;", [oldTeam.mID,playerFound.mID]);
                if(row){
                    const result = await db.run('UPDATE TeamPlayers SET TeamID = ? WHERE ID = (SELECT ID FROM TeamPlayers WHERE TeamID = ? AND PlayerID = ? LIMIT 1)',[newTeam.mID,oldTeam.mID,playerFound.mID]);
                    if(result){
                        return { playerTransferred: true, playerFoundIndex };
                    }
                }
            }
            else{
                return { playerTransferred: false, playerFoundIndex };
            }
        }
        catch(err){
            console.error('❌ Query error:', err);
        }
        return false;
    }

    static async RemovePlayerFromTeam(teamID,playerName){
        let db = await ConnectToDB();

        try{
            let correspondingPlayer = await Player.RetrievePlayerByName(playerName); 
            if(correspondingPlayer){
                const row = await db.get("SELECT * FROM TeamPlayers WHERE TeamID = ? AND PlayerID = ? ;", [teamID,correspondingPlayer.mID]);
                if(row){
                    const result = await db.run('DELETE FROM TeamPlayers WHERE TeamID = ? AND PlayerID = ? ;',[teamID,correspondingPlayer.mID]);
                    return result.changes;
                }

            }
        }
        catch(err){
            console.error('❌ Query error:', err);
        }
    

    }
    static async RemovePlayerFromTeamByID(teamID,id){
        let db = await ConnectToDB();

        try{
            let correspondingPlayer = await Player.RetrievePlayerByID(id); 
            if(correspondingPlayer){
                const row = await db.get("SELECT * FROM TeamPlayers WHERE TeamID = ? AND PlayerID = ? ;", [teamID,correspondingPlayer.mID]);
                if(row){
                    const result = await db.run('DELETE FROM TeamPlayers WHERE ID = (SELECT ID FROM TeamPlayers WHERE TeamID = ? AND PlayerID = ? LIMIT 1);',[teamID,correspondingPlayer.mID]);
                    return result.changes;
                }

            }
        }
        catch(err){
            console.error('❌ Query error:', err);
        }
    

    }

    static sort(teamA,teamB){
        if(teamA.mBalance < teamB.mBalance){
            return 1;
        }
        else if(teamA.mBalance > teamB.mBalance){
            return -1;
        }
        else{
            return 0;
        }
        
    }
    
}

async function ConnectToDB(){
  try {
    const db = await open({
      filename: './botDB.db',
      driver: sqlite3.Database
    });
    return db;
  } catch (error) {
    console.error('❌ Failed to connect to DB:', error);
    throw error;
  }
}


module.exports = Team;