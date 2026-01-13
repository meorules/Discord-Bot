const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const CardType = require('./cardType.js');
let mPriorityList = CardType.mPriorityList;

class TeamPlayer {

    constructor(ID,teamID,playerID,upgrade,positions,nation,team,league,cardType, notes){
        this.mID = ID;
        this.mTeamID = teamID;
        this.mPlayerID = playerID;
        this.mUpgrade = upgrade;
        this.mPositions = positions;
        this.mNation = nation;
        this.mTeam = team;
        this.mLeague = league;
        this.mCardType = cardType;
        this.mNotes = notes;
        this.mPlayer = null;
    }

    setAttributes(ID,teamID,playerID,upgrade,positions,nation,team,league,cardType, notes){
        this.mID = ID;
        this.mTeamID = teamID;
        this.mPlayerID = playerID;
        this.mUpgrade = upgrade;
        this.mPositions = positions;
        this.mNation = nation;
        this.mTeam = team;
        this.mLeague = league;
        this.mCardType = cardType;
        this.mNotes = notes;
        this.mPlayer = null;
    }

    async stringify(){
        if(this.mID != -1){
            if(this.mPlayer){
                return await this.mPlayer.stringify();
            }
        }
        else return "Invalid Lineup Player";
    }

   static async RetrieveTeamPlayer(id){
        let db = await ConnectToDB();
        var player;

        try{
            const row = await db.get("SELECT * FROM TeamPlayers WHERE ID = ? ;", [id]);
            if(!row){
                return null;
            }
            var teamPlayer = new TeamPlayer(row.ID,row.TeamID,row.PlayerID,row.Upgrade,row.Positions,row.Nation,row.Team,row.League,row.CardType,row.Notes);

            var correspondingPlayer = await Player.RetrievePlayerByID(row.PlayerID);
            correspondingPlayer.upgrade(row.Upgrade);
            if(row.Positions){
                correspondingPlayer.addPosition(row.Positions);
            }
            if(row.Team){
                correspondingPlayer.mTeam = row.Team;
            }
            if(row.League){
                correspondingPlayer.mLeague = row.League;
            }
            if(row.CardType){
                correspondingPlayer.mCardTypeID = row.CardType;
            }
            if(row.Notes){
                correspondingPlayer.Notes = row.Notes;
            }
            if(row.Nation){
                correspondingPlayer.mCountry = row.Nation;
            }
            teamPlayer.mPlayer = correspondingPlayer;
            return teamPlayer;
        }
        
        catch(err){
            console.error('❌ Query error:', err);
        }
    
    }

    static async InsertTeamPlayer(TeamID,PlayerID){
        let db = await ConnectToDB();
        let result = await db.run("INSERT INTO TeamPlayers(TeamID,PlayerID) VALUES(?,?)",[TeamID,PlayerID]);
        return result.changes;

    }


    static async EditTeamPlayer(teamPlayer,parameterName,newValue){
        let db = await ConnectToDB();
        try{
            if(parameterName == "TeamID"){
                teamPlayer.mTeamID = newValue;
                const result = await db.run('UPDATE TeamPlayers SET TeamID = ? WHERE ID = ?;',[newValue, teamPlayer.mID]);
                return teamPlayer;
            }
            else if(parameterName == "Positions"){
                teamPlayer.mPositions = newValue;
                const result = await db.run('UPDATE TeamPlayers SET Positions = ? WHERE ID = ?;',[newValue, teamPlayer.mID]);
                return teamPlayer;
            }
            else if(parameterName == "Positions"){
                teamPlayer.mPositions = newValue;
                const result = await db.run('UPDATE TeamPlayers SET Positions = ? WHERE ID = ?;',[newValue, teamPlayer.mID]);
                return teamPlayer;
            }
        }
        catch(err){
            console.error('❌ Query error:', err);
        }
    }

    static async DeleteTeamPlayer(teamPlayerID){
        let db = await ConnectToDB();
        var result;
        try{
            result = await db.run('DELETE FROM TeamPlayers WHERE ID = ?;',[teamPlayerID]);

            const lineupPlayerCheck = await TeamLineupPlayer.RetrieveLineupPlayerByTeamPlayerID(teamPlayerID);
            if(lineupPlayerCheck){
                await TeamLineupPlayer.EditLineupPlayer(lineupPlayerCheck,"TeamPlayerID",-1);
            }

        }
        catch(err){
            console.error('❌ Query error:', err);
        }
        return result.changes;
    }
        
    static sort(teamPlayerA,teamPlayerB){
        playerA = teamPlayerA.mPlayer;
        playerB = teamPlayerB.mPlayer;
        if(playerA.mRating < playerB.mRating){
            return 1;
        }
        else if(playerA.mRating > playerB.mRating){
            return -1;
        }
        else{
            let cardTypeAPriority = mPriorityList.find(o => o.cardTypeID == playerA.mCardTypeID);
            let cardTypeBPriority = mPriorityList.find(o => o.cardTypeID == playerB.mCardTypeID);

            if (cardTypeAPriority < cardTypeBPriority){
                return -1;
            }
            else if(cardTypeAPriority > cardTypeBPriority){
                return 1;
            }
            else{
                return 0;
            }
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

module.exports = TeamPlayer;
