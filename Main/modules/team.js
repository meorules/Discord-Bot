const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const Player = require('./Player.js');

class Team {

    constructor(id,teamName,primaryColour,secondaryColour,discordusername,autoAddPlayers,balance){
        this.mID = id;
        this.mTeamName = teamName;
        this.mPrimaryColour = primaryColour;
        this.mSecondaryColour = secondaryColour;
        this.mDiscordUsername = discordusername;
        this.mAutoAddPlayers = autoAddPlayers;
        this.mBalance = balance;
        this.mPlayers = null;
    }

    setAttributes(id,teamName,primaryColour,secondaryColour,discordusername,autoAddPlayers,players,balance){
        this.mID = id;
        this.mTeamName = teamName;
        this.mPrimaryColour = primaryColour;
        this.mSecondaryColour = secondaryColour;
        this.mDiscordUsername = discordusername;
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
                players.push(correspondingPlayer);
            }

            return players;

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
                let result = await db.run("INSERT INTO TeamPlayers(TeamID,PlayerID,Upgrade) VALUES(?,?,?)",[teamID,players[player].mID,0]);
                count += result.changes;
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

    static async EditPlayerUpgrade(teamID,playerName,upgrade){
        let db = await ConnectToDB();
        try{

            let correspondingPlayer = await Player.RetrievePlayerByName(playerName); 
            if(correspondingPlayer){
                const row = await db.get("SELECT * FROM TeamPlayers WHERE TeamID = ? AND PlayerID = ? ;", [teamID,correspondingPlayer.mID]);
                if(row){
                    const result = await db.run('UPDATE TeamPlayers SET Upgrade = ? WHERE teamID = ? AND PlayerID = ?;',[upgrade,teamID,correspondingPlayer.mID]);
                    correspondingPlayer.upgrade(upgrade);
                    return correspondingPlayer;
                }
            }
        }
        catch(err){
            console.error('❌ Query error:', err);
        }
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
