const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const Team = require('./team.js');
const TeamLineupPlayer = require('./TeamLineupPlayer.js');

const countryCodeArrays = require('../countrycodes.js')

const Formations = {
  // -------------------- 3 DEF --------------------
  "3142": ["GK","CB","CB","CB","CDM","RM","CM","CM","LM","ST","ST"],

  "3241": ["GK","CB","CB","CB","CDM","CDM","RW","CAM","CAM","LW","ST"],

  "3412": ["GK","CB","CB","CB","RM","CM","CM","LM","CAM","ST","ST"],
  "3421": ["GK","CB","CB","CB","RM","CM","CM","LM","CAM","CAM","ST"],

  "343(1)": ["GK","CB","CB","CB","CDM","RM","CAM","LM","RW","LW","ST"], 
  "343(2)": ["GK","CB","CB","CB","RM","CM","CM","LM","RW","ST","LW"],   

  "3511": ["GK","CB","CB","CB","CDM","CDM","RM","CM","LM","CAM","ST"],
  "352":  ["GK","CB","CB","CB","CDM","CDM","RM","LM","CAM","ST","ST"],

  // -------------------- 4 DEF --------------------
  "41212(1)": ["GK","RB","CB","CB","LB","CDM","CM","CM","CAM","ST","ST"],
  "41212(2)": ["GK","RB","CB","CB","LB","CDM","RM","LM","CAM","ST","ST"],   

  "4132(1)": ["GK","RB","CB","CB","LB","CDM","RM","LM","CM","ST","ST"],
  "4132(2)": ["GK","RB","CB","CB","LB","CDM","CAM","CAM","CAM","ST","ST"],  

  "4141": ["GK","RB","CB","CB","LB","CDM","RM","CM","CM","LM","ST"],

  "4222": ["GK","RB","CB","CB","LB","CDM","CDM","CAM","CAM","ST","ST"],

  "4213": ["GK","RB","CB","CB","LB","CDM","CDM","CAM","RW","ST","LW"],     
  "4231(1)": ["GK","RB","CB","CB","LB","CDM","CDM","CAM","CAM","CAM","ST"],   
  "4231(2)": ["GK","RB","CB","CB","LB","CDM","CDM","RM","CAM","LM","ST"],   
  "424": ["GK","RB","CB","CB","LB","CM","CM","RW","LW","ST","ST"],

  "4312": ["GK","RB","CB","CB","LB","CM","CM","CM","CAM","ST","ST"],
  "4321": ["GK","RB","CB","CB","LB","CM","CM","CM","CAM","CAM","ST"],

  "433(1)": ["GK","RB","CB","CB","LB","CM","CM","CM","RW","ST","LW"],  
  "433(2)": ["GK","RB","CB","CB","LB","CDM","CM","CM","RW","ST","LW"],     
  "433(3)": ["GK","RB","CB","CB","LB","CDM","CDM","CM","RW","ST","LW"],      
  "433(4)": ["GK","RB","CB","CB","LB","CM","CM","CAM","RW","ST","LW"],     
  "433(5)": ["GK","RB","CB","CB","LB","CDM","CM","CM","RW","CAM","LW"],     

  "4411": ["GK","RB","CB","CB","LB","RM","CM","CM","LM","CAM","ST"],     

  "442(1)": ["GK","RB","CB","CB","LB","RM","CM","CM","LM","ST","ST"],     
  "442(2)": ["GK","RB","CB","CB","LB","CDM","CDM","RM","LM","ST","ST"],      

  "451(1)": ["GK","RB","CB","CB","LB","RM","CM","LM","CAM","CAM","ST"],      
  "451(2)": ["GK","RB","CB","CB","LB","RM","CM","CM","CM","LM","ST"],      

  // -------------------- 5 DEF --------------------
  "5212": ["GK","RB","CB","CB","CB","LB","CM","CM","CAM","ST","ST"],
  "523":  ["GK","RB","CB","CB","CB","LB","CM","CM","RW","ST","LW"],
  "532(1)":  ["GK","RB","CB","CB","CB","LB","CM","CM","CM","ST","ST"],
  "532(2)":  ["GK","RB","CB","CB","CB","LB","CDM","CM","CM","ST","ST"],

  "541(1)": ["GK","RB","CB","CB","CB","LB","RM","CM","CM","LM","ST"],   
  "541(2)": ["GK","RB","CB","CB","CB","LB","RM","CM","CM","LM","ST"],    
};



class Lineup {

    constructor(ID,teamID,formation,totalChemistry,lastCalculated,lineupPlayers){
        this.mID = ID;
        this.mTeamID = teamID;
        this.mFormation = formation;
        this.mChemistry = totalChemistry;
        this.mLastEdited = lastCalculated;
        if(lineupPlayers){
            this.lineupPlayers = lineupPlayers;
        }
        else{
            //console.error('No lineup players provided');
            this.lineupPlayers = [];
        }

        this.mChemistryArray = [];
    }

    setAttributes(ID,teamID,formation,totalChemistry,lastCalculated,lineupPlayers,chemistryArray){
        this.mID = ID;
        this.mTeamID = teamID;
        this.mFormation = formation;
        this.mChemistry = totalChemistry;
        this.mLastEdited = lastCalculated;
        this.lineupPlayers = lineupPlayers;
        this.mChemistryArray = chemistryArray;
    }

    async stringify(){
        if(this.mID != -1){
            let team = await Team.RetrieveTeamByID(this.mTeamID);
            let lineupString = team.stringify() + "'s Lineup("+ this.mFormation +"):\n";
            for(let lineupPlayer of this.lineupPlayers){
                lineupString += await lineupPlayer.stringify() + "\n";
                if(lineupPlayer.mLineupPositionNumber == 11){
                    lineupString += "---- SUBSTITUTES ----\n";
                }
            }
            lineupString+= "Total Chemistry: " + this.mChemistry;
            return lineupString;
        }
        else return "Invalid Lineups";
    }

    async calculateChemistry(){
        let totalChemistry = 0;
        let iconCount = 0;
        let BirthdayCount = 0;
        let chemistryArray = [];
        for(let lineupPlayer=0;lineupPlayer <11;lineupPlayer++){
            if(this.lineupPlayers[lineupPlayer].mTeamPlayerID != -1 && this.lineupPlayers[lineupPlayer].mPlayer.mPosition.includes(this.lineupPlayers[lineupPlayer].mPosition)){
                let player = this.lineupPlayers[lineupPlayer].mPlayer;
                Lineup.addToChemistryArray(player.mTeam,chemistryArray,"Team");
                let nationGroup = countryCodeArrays.nationGroups.get(player.mCountry);


                if(player.mCardTypeID == 4){
                    Lineup.addToChemistryArray(player.mLeague,chemistryArray,"League");
                    Lineup.addToChemistryArray(player.mLeague,chemistryArray,"League");
                    Lineup.addToChemistryArray(player.mLeague,chemistryArray,"League");
                    Lineup.addToChemistryArray(player.mLeague,chemistryArray,"League");
                    Lineup.addToChemistryArray(player.mCountry,chemistryArray,"Country");
                    Lineup.addToChemistryArray(player.mCountry,chemistryArray,"Country");
                    if(nationGroup){
                        Lineup.addToChemistryArray(nationGroup,chemistryArray,"Nation Group");
                        Lineup.addToChemistryArray(nationGroup,chemistryArray,"Nation Group");
                    }

                }
                else if(player.mCardTypeID == 5){
                    Lineup.addToChemistryArray(player.mCountry,chemistryArray,"Country");
                    Lineup.addToChemistryArray(player.mCountry,chemistryArray,"Country");
                    Lineup.addToChemistryArray(player.mCountry,chemistryArray,"Country");
                    Lineup.addToChemistryArray(player.mCountry,chemistryArray,"Country");
                    if(nationGroup){
                        Lineup.addToChemistryArray(nationGroup,chemistryArray,"Nation Group");
                        Lineup.addToChemistryArray(nationGroup,chemistryArray,"Nation Group");
                        Lineup.addToChemistryArray(nationGroup,chemistryArray,"Nation Group");
                    }
                    iconCount++;

                }
                else if(player.mCardTypeID == 10){
                    BirthdayCount++;
                }
                else{
                    Lineup.addToChemistryArray(player.mLeague,chemistryArray,"League");
                    Lineup.addToChemistryArray(player.mCountry,chemistryArray,"Country");
                    if(nationGroup){
                        Lineup.addToChemistryArray(nationGroup,chemistryArray,"Nation Group");
                    }
                }


            }
        }

        for(let i=0;i<iconCount;i++){
            Lineup.increaseChemistryCountPerType(chemistryArray,"League",2);
        }

        for(let i=0;i<BirthdayCount;i++){
            Lineup.increaseChemistryCountPerType(chemistryArray,"League",1);
            Lineup.increaseChemistryCountPerType(chemistryArray,"Country",1);
            Lineup.increaseChemistryCountPerType(chemistryArray,"Nation Group",1);
        }

        for(let lineupPlayer=0;lineupPlayer <11;lineupPlayer++){
            if(this.lineupPlayers[lineupPlayer].mTeamPlayerID != -1 && this.lineupPlayers[lineupPlayer].mPlayer.mPosition.includes(this.lineupPlayers[lineupPlayer].mPosition)){
                let player = this.lineupPlayers[lineupPlayer];
                player.mChemistry =0;
                for(let chemistryCounter of chemistryArray){
                    if(chemistryCounter.type == "Country" && chemistryCounter.name == player.mPlayer.mCountry){
                        if(chemistryCounter.count >=9){
                            player.mChemistry +=3;
                        }
                        else if(chemistryCounter.count >=7 && chemistryCounter.count >5){
                            player.mChemistry +=2;
                        }
                        else if(chemistryCounter.count  <7 && chemistryCounter.count >=5){
                            player.mChemistry +=1;
                        }
                    }

                    if(chemistryCounter.type == "League" && chemistryCounter.name == player.mPlayer.mLeague){
                        if(chemistryCounter.count >=9){
                            player.mChemistry +=3;
                        }
                        else if(chemistryCounter.count >=7 && chemistryCounter.count >5){
                            player.mChemistry +=2;
                        }
                        else if(chemistryCounter.count  <7 && chemistryCounter.count >=5){
                            player.mChemistry +=1;
                        }
                    }

                    if(chemistryCounter.type == "Team" && chemistryCounter.name == player.mPlayer.mTeam){
                        if(chemistryCounter.count >=6){
                            player.mChemistry +=3;
                        }
                        else if(chemistryCounter.count >=4){
                            player.mChemistry +=2;
                        }
                        else if(chemistryCounter.count ==3){
                            player.mChemistry +=1;
                        }
                    }

                    if(chemistryCounter.type == "Nation Group"){
                        let nationGroup = countryCodeArrays.nationGroups.get(player.mPlayer.mCountry);
                        if(chemistryCounter.name == nationGroup){
                            if(chemistryCounter.count >=7){
                                player.mChemistry +=1;
                            }
                        }
                    }

                }
                if(player.mPlayer.mCardTypeID == 4 || player.mPlayer.mCardTypeID == 5 || player.mPlayer.mCardTypeID == 10){
                    player.mChemistry =3;
                }

                let actualChemistry = Math.min(player.mChemistry,3);
                player.mChemistry = actualChemistry;
                totalChemistry += actualChemistry;

                await TeamLineupPlayer.EditLineupPlayer(player,"Chemistry",actualChemistry);
            }
            else{
                this.lineupPlayers[lineupPlayer].mChemistry = 0;
            }
        }
        this.mChemistry = totalChemistry;
        this.mChemistryArray = chemistryArray;

        let db = await ConnectToDB();
        const result = await db.run('UPDATE TeamLineup SET TotalChemistry = ? WHERE ID = ?;',[totalChemistry, this.mID]);
        return totalChemistry;
    }

    static addToChemistryArray(chemistryCounter,chemistryArray,type){
        for(let i=0;i<chemistryArray.length;i++){
            if(chemistryArray[i].name == chemistryCounter){
                chemistryArray[i].count++;
                return;
            }
        }
        chemistryArray.push({name:chemistryCounter,count:1,type:type});
    }

    static increaseChemistryCountPerType(chemistryArray,type,amount){
        for(let i=0;i<chemistryArray.length;i++){
            if(chemistryArray[i].type == type){
                chemistryArray[i].count += amount;
            }
        }
    }

    static async CreateLineup(teamID,formation){
        let db = await ConnectToDB();
        var newLineup = null;

        if(!Formations[formation]){
            formation = "442(1)";
        }

        try{
            const result = await db.run('INSERT INTO TeamLineup (TeamID,Formation,TotalChemistry,LastCalculated) VALUES (?,?,?,datetime("now"));',[teamID,formation,0]);
            let lineupPlayers = [];
            let count = 0;
            for(let pos in Formations[formation]){
                let lineupPlayer = await TeamLineupPlayer.CreateLineupPlayer(result.lastID,-1,0,(count+1),Formations[formation][pos]);
                lineupPlayers.push(lineupPlayer);
                count++;
            }
            for(let x=1;x<8;x++){
                let lineupPlayer = await TeamLineupPlayer.CreateLineupPlayer(result.lastID,-1,0,(11+x),"SUB"+x);
                lineupPlayers.push(lineupPlayer);
            }
            
            newLineup = new Lineup(result.lastID,teamID,formation,0,new Date().toISOString(), lineupPlayers);
            return newLineup;
        }
        catch(err){
            console.error('❌ Query error:', err);
        }
    }

    static async RetrieveLineup(teamID){
    
        let db = await ConnectToDB();

        try{
            const row = await db.get("SELECT * FROM TeamLineup WHERE TeamID = ? ;", [teamID]);
            if(!row){
                return null;
            }
            var teamLineup = new Lineup(row.ID,row.TeamID,row.Formation,row.TotalChemistry,row.LastCalculated);
            teamLineup.lineupPlayers = await TeamLineupPlayer.RetrieveLineupPlayersByLineup(teamLineup.mID);
            await teamLineup.calculateChemistry();
            return teamLineup;
        }
        catch(err){
            console.error('❌ Query error:', err);
        }
    }

    static async SwitchFormation(lineup,newFormation){
        let db = await ConnectToDB();
        if(Formations[newFormation] == null){
            console.error('Formation not found, keeping current formation');
            return false;
        }

        try{
            for(let lineupPlayer in lineup.lineupPlayers){
                if(lineupPlayer<11){
                    TeamLineupPlayer.EditLineupPlayer(lineup.lineupPlayers[lineupPlayer],"Position",Formations[newFormation][lineupPlayer]);
                }
                else{
                    break;
                }
            }
            lineup.mFormation = newFormation;
            const result = await db.run('UPDATE TeamLineup SET Formation = ? WHERE ID = ?;',[newFormation, lineup.mID]);
            await lineup.calculateChemistry();
            return true;
        }
        catch(err){
            console.error('❌ Query error:', err);
        }

    }

    static async EditLineupPlayer(teamID,playerName,newPosition,changesMade){

        //Get lineup player by name from team players
        
        let db = await ConnectToDB();

        let lineup = await Lineup.RetrieveLineup(teamID);
        let team = await Team.RetrieveTeamByID(teamID);

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
                for(let lineupPlayerCheck of lineup.lineupPlayers){
                    if(lineupPlayerCheck.mLineupPositionNumber == newPosition){
                        const row = await db.get("SELECT * FROM TeamPlayers WHERE TeamID = ? AND PlayerID = ? ;", [teamID,playerFound.mID]);
                        if(row){
                            lineupPlayerCheck = await TeamLineupPlayer.EditLineupPlayer(lineupPlayerCheck,"TeamPlayerID",row.ID);
                        }
                        break;
                    }
                }
                lineup.calculateChemistry();
                changesMade.result = true;
                return lineup;
            }
            else{
                console.error('Player not found on team');
                changesMade.result = false;
                return lineup;
            }
        }
        catch(err){
            console.error('❌ Query error:', err);
        }

       

    }

    
    static async EditLineupPlayerPositionOrBoost(teamID,playerName,parameter,newValue,changesMade){

        //Get lineup player by name from team players
        
        let db = await ConnectToDB();

        let lineup = await Lineup.RetrieveLineup(teamID);
        let team = await Team.RetrieveTeamByID(teamID);

        try{

            let playerFound = null;
            let playerFoundIndex = -1;
            for(var player in lineup.lineupPlayers){
                    playerFoundIndex++;
                    if(lineup.lineupPlayers[player].mPlayer.mPlayerName.toLowerCase().trim().includes(playerName.toLowerCase().trim())){
                        playerFound = lineup.lineupPlayers[player];
                       
                        playerFoundIndex=player;
                        break;
                    }
            }
            if(playerFound){
                if(parameter == "Position"){
                    if(playerFound.mPosition.includes("SUB")){
                        newValue = "SUB "+ (playerFoundIndex-10) +" ("+ newValue+")";

                    }
                    playerFound = await TeamLineupPlayer.EditLineupPlayer(playerFound,"Position",newValue);
                }
                else if(parameter == "Boost"){
                    playerFound = await TeamLineupPlayer.EditLineupPlayer(playerFound,"Boost",newValue);
                }
                lineup.calculateChemistry();
                changesMade.result = true;
                return lineup;
            }
            else{
                console.error('Player not found on team');
                changesMade.result = false;
                return lineup;
            }
        }
        catch(err){
            console.error('❌ Query error:', err);
        }

       

    }

    static returnFormations(){
        return Formations;
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

module.exports = Lineup;
