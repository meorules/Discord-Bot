const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const Team = require('./team.js');

class TeamLineupPlayer {

    constructor(ID,teamLineupID,teamPlayerID,Chemistry,Position,LineupPositionNumber,LastEdited){
        this.mID = ID;
        this.mTeamLineupID = teamLineupID;
        this.mTeamPlayerID = teamPlayerID;
        this.mChemistry = Chemistry;
        this.mPosition = Position;
        this.mLineupPositionNumber = LineupPositionNumber;
        this.mLastEdited = LastEdited;
        this.mPlayer = null;
    }

    setAttributes(ID,teamLineupID,teamPlayerID,Chemistry,Position,LineupPositionNumber,LastEdited,Player){
        this.mID = ID;
        this.mTeamLineupID = teamLineupID;
        this.mTeamPlayerID = teamPlayerID;
        this.mChemistry = Chemistry;
        this.mPosition = Position;
        this.mLineupPositionNumber = LineupPositionNumber;
        this.mLastEdited = LastEdited;
        this.mPlayer = Player;
    }

    async stringify(){
        if(this.mID != -1){
            if(this.mPlayer){
                let playerString = await this.mPlayer.stringify(true);
                if(!this.mPosition.includes("SUB")){
                    return this.mLineupPositionNumber + ". **" + this.mPosition + "**: " + playerString + " | :test_tube: +" + this.mChemistry;
                }else{
                    return this.mLineupPositionNumber + ". **" + this.mPosition + "**: " + playerString;
                }
            }
            else{
                return this.mLineupPositionNumber + ". **" + this.mPosition + "**: No Player Assigned";
            }
        }
        else return "Invalid Lineup Player";
    }

    static async RetrieveLineupPlayer(id){
    
        let db = await ConnectToDB();

        try{
            const row = await db.get("SELECT * FROM TeamLineupPlayers WHERE ID = ? ;", [id]);
            const lineupPlayerToReturn = new TeamLineupPlayer(row.ID,row.TeamLineupID,row.TeamPlayerID,row.Chemistry,row.Position,row.LineupPositionNumber,row.LastEdited);

            return lineupPlayerToReturn;
        }
        catch(err){
            console.error('❌ Query error:', err);
        }
    }

    static async RetrieveLineupPlayersByLineup(lineupID){
    
        let db = await ConnectToDB();
        let lineupPlayers = [];

        try{
            const rows = await db.all("SELECT * FROM TeamLineupPlayers WHERE TeamLineupID = ? ;", [lineupID]);
            for(let row of rows){
                var lineupPlayerToReturn = new TeamLineupPlayer(row.ID,row.TeamLineupID,row.TeamPlayerID,row.CalculatedChemistry,row.LineupPosition,row.LineupPositionNumber,row.LastEdited);
                if(lineupPlayerToReturn.mTeamPlayerID != -1){
                    lineupPlayerToReturn.mPlayer = await Team.RetrieveTeamPlayer(lineupPlayerToReturn.mTeamPlayerID);
                }
                lineupPlayers.push(lineupPlayerToReturn);

            }

            return lineupPlayers;
        }
        catch(err){
            console.error('❌ Query error:', err);
        }
    }

    static async EditLineupPlayer(lineupPlayer,parameterName,newValue){
        let db = await ConnectToDB();
        try{
            if(parameterName == "Chemistry"){
                lineupPlayer.mChemistry = newValue;
                const result = await db.run('UPDATE TeamLineupPlayers SET CalculatedChemistry = ? WHERE ID = ?;',[newValue, lineupPlayer.mID]);
                return lineupPlayer;
            }
            else if(parameterName == "Position"){
                lineupPlayer.mPosition = newValue;
                const result = await db.run('UPDATE TeamLineupPlayers SET LineupPosition = ? WHERE ID = ?;',[newValue, lineupPlayer.mID]);
                return lineupPlayer;
            }
            else if(parameterName == "TeamPlayerID"){
                lineupPlayer.mTeamPlayerID = newValue;
                const result = await db.run('UPDATE TeamLineupPlayers SET TeamPlayerID = ? WHERE ID = ?;',[newValue, lineupPlayer.mID]);
                lineupPlayer.mPlayer = await Team.RetrieveTeamPlayer(newValue);
                return lineupPlayer;
            }
        }
        catch(err){
            console.error('❌ Query error:', err);
        }
    }

    static async CreateLineupPlayer(teamLineupID,teamPlayerID,Chemistry,LineupPositionNumber,Position){
        let db = await ConnectToDB();
        var newLineupPlayer = null;

        try{
            const result = await db.run('INSERT INTO TeamLineupPlayers (TeamLineupID,TeamPlayerID,CalculatedChemistry,LineupPosition,LineupPositionNumber,LastEdited) VALUES (?,?,?,?,?,datetime("now"));',[teamLineupID,teamPlayerID,Chemistry,Position,LineupPositionNumber]);
            newLineupPlayer = new TeamLineupPlayer(result.lastID,teamLineupID,teamPlayerID,Chemistry,Position,LineupPositionNumber,new Date().toISOString());
            if(teamPlayerID != -1){
                newLineupPlayer.mPlayer = await Team.RetrieveTeamPlayer(teamPlayerID);
            }
            return newLineupPlayer;
        }
        catch(err){
            console.error('❌ Query error:', err);
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

module.exports = TeamLineupPlayer;
