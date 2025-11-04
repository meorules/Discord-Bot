const sqlite3 = require('sqlite3');
const countryCodeArrays = require('../countrycodes.js')

const CardType = require('./cardType.js');

class Player{

    constructor(id, name, cardTypeId, position,age, rating, team, league, height, weight, crossing, finishing, heading, jumping, penalties, weakFoot, skillMoves, passing, defending, attacking,country, url, gender,boost){
        this.mID = id;
        this.mPlayerName = name;
        this.mCardTypeID = cardTypeId;
        this.mPosition = position;
        this.mAge = age;
        this.mRating = rating;
        this.mTeam = team;
        this.mLeague = league;
        this.mHeight = height;
        this.mWeight = weight;
        this.mCrossing = crossing;
        this.mFinishing = finishing;
        this.mHeading = heading;
        this.mJumping = jumping;
        this.mPenalties = penalties;
        this.mWeakFoot = weakFoot;
        this.mSkillMoves = skillMoves;
        this.mPassing = passing;
        this.mDefending = defending;
        this.mAttacking = attacking;
        this.mCountry = country;
        this.mURL = url;
        this.mGender = gender;
        this.mBoost = boost;
    }

    setAttributes(id, name, cardTypeId, position,age, rating, team, league, height, weight, crossing, finishing, heading, jumping, penalties, weakFoot, skillMoves, passing, defending, attacking,country, url, gender,boost){
        this.mID = id;
        this.mPlayerName = name;
        this.mCardTypeID = cardTypeId;
        this.mPosition = position;
        this.mAge = age;
        this.mRating = rating;
        this.mTeam = team;
        this.mLeague = league;
        this.mHeight = height;
        this.mWeight = weight;
        this.mCrossing = crossing;
        this.mFinishing = finishing;
        this.mHeading = heading;
        this.mJumping = jumping;
        this.mPenalties = penalties;
        this.mWeakFoot = weakFoot;
        this.mSkillMoves = skillMoves;
        this.mPassing = passing;
        this.mDefending = defending;
        this.mAttacking = attacking;
        this.mCountry = country;
        this.mURL = url;
        this.mGender = gender;
        this.mBoost = boost;
    }

    isWalkout(){
        if(this.mRating >=85 || this.mCardTypeID > 3){
            return true;
        }
        return false;
    }

    async stringify(){
        let toReturn = "";
        if(this.mID == -1){
            throw new Error('Some invalid player was stringified.');
        }
        let retrievedCardType = await CardType.RetrieveCardTypeByID(this.mCardTypeID);
        //console.log(retrievedCardType)
        //Adding Emoji
        toReturn += retrievedCardType.mEmoji + " ";
        //Adding extra card type for specials
        if(this.mCardTypeID != '1' || this.mCardTypeID != '2'|| this.mCardTypeID != '3'){
            toReturn += "**" + retrievedCardType.mCardType + "** ";
        }
        //Adding league if it is a hero
        if(this.mCardTypeID == '4'){
            toReturn += this.mLeague + " ";
        }
        //Adding rating
        toReturn += this.mRating + " ";
        //Adding flag
        toReturn += ":" + countryCodeArrays.countryAlphaCodeDictionary[this.mCountry].toLowerCase() + ": ";
        //Adding name & position
        toReturn += "**"+ this.mPlayerName + " " + this.mPosition + "** ";
        //Adding team
        toReturn += this.mTeam + " ";
        if(this.mGender == "Male"){
            toReturn += ":man: ";
        }
        else{
            toReturn += ":woman: ";
        }

        //Add Boost tag if there is one
        if(this.mBoost == 1){
            toReturn += " :sparkles:";
        }
        return toReturn;
    }

    async returnWalkoutStrings(){
        let toReturn = [];

        if(this.mID == -1){
            throw new Error('Some invalid player was stringified into a walkout');
        }
        
        //Add Boost tag if there is one
        if(this.mBoost == 1){
            toReturn.push(" :sparkles: \n");
        }

        let gender = ":man: \n";
        if(this.mGender == "Female"){
            gender = ":woman: \n";
        }
        toReturn.push(gender);

        let retrievedCardType = await CardType.RetrieveCardTypeByID(this.mCardTypeID);
        //console.log(retrievedCardType)
        //Adding Emoji
        //Adding extra card type for specials
        if(this.mCardTypeID != '1' || this.mCardTypeID != '2'|| this.mCardTypeID != '3'){
            toReturn.push(retrievedCardType.mEmoji + " **" + retrievedCardType.mCardType + "** \n");
        }
        else{
            toReturn.push(retrievedCardType.mEmoji + " \n");
        }

        if(this.mCardTypeID == '4'){
            toReturn.push(this.mLeague + " \n");
        }

        //Adding flag
        toReturn.push(":" + countryCodeArrays.countryAlphaCodeDictionary[this.mCountry].toLowerCase() + ": \n");

        //Adding team
        if(this.mCardTypeID != '4' && this.mCardTypeID != '5'){
            toReturn.push(this.mTeam + " \n");
        }

        //Adding position 
        toReturn.push(this.mPosition + " \n")

        //Adding rating
        toReturn.push(this.mRating + " \n");

        //Adding name
        toReturn.push("**"+ this.mPlayerName + "** \n");

        return toReturn;
    }

    static async RetrievePlayerByID(id){
        
        db = ConnectToDB();

        const PlayerToReturn = new Player();

        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM Players WHERE ID = ? ;", [id], (err, row) => {
            if (err) {
            console.error('❌ Query error:', err);
            return reject(err);
            }

            PlayerToReturn.setAttributes(row.ID,row.PlayerName,row.CardTypeID,row.Position,row.Age, row.Rating, row.Team, row.League, row.Height, row.Weight, row.Crossing, row.Finishing, row.Heading, row.Jumping, row.Penalties, row.WeakFoot, row.SkillMoves,row.Passing, row.Defending, row.Attacking, row.Country, row.URL, row.Gender,row.Boost);
            //console.log(PlayerToReturn);
            return resolve(PlayerToReturn);
            });
        });
    }

    static async RetrievePlayerByName(name,ignoreID){

        db = ConnectToDB();
        name = '%' + name + '%';
        let params = [];
        params.push(name);

        const PlayerToReturn = new Player();
        let baseSQL = "SELECT * FROM Players WHERE PlayerName LIKE ? "

        if(ignoreID){
            baseSQL = baseSQL + "AND ID != ?;"
            params.push(ignoreID);
        }
        else{
            baseSQL = baseSQL + ";";
        }

        return new Promise((resolve, reject) => {
            db.get(baseSQL, params, (err, row) => {
            if (err) {
            console.error('❌ Query error:', err);
            return reject(err);
            }
            if(row){
                PlayerToReturn.setAttributes(row.ID,row.PlayerName,row.CardTypeID,row.Position,row.Age, row.Rating, row.Team, row.League, row.Height, row.Weight, row.Crossing, row.Finishing, row.Heading, row.Jumping, row.Penalties, row.WeakFoot, row.SkillMoves,row.Passing, row.Defending, row.Attacking, row.Country, row.URL, row.Gender,row.Boost);
                //console.log(PlayerToReturn);
                return resolve(PlayerToReturn);
            }
            else{
                return reject(null);
            }
            });
        });
    }

    static async RetrievePlayersByRating(rating){
    
        db = ConnectToDB();

        let players = [];

        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM Players WHERE Rating = ? ;", [rating], (err, rows) => {
            if (err) {
                console.error('❌ Query error:', err);
                return reject(err);
            }

            //console.log(rows);
            
            rows.forEach(row => {
                let player = new Player(row.ID,row.PlayerName,row.CardTypeID,row.Position,row.Age, row.Rating, row.Team, row.League, row.Height, row.Weight, row.Crossing, row.Finishing, row.Heading, row.Jumping, row.Penalties, row.WeakFoot, row.SkillMoves,row.Passing, row.Defending, row.Attacking, row.Country, row.URL, row.Gender,row.Boost);
                players.push(player);
            });

            return resolve(players);
            });
        });
    }

    
    static async RetrievePlayersByCardType(cardTypeID){
    
        db = ConnectToDB();

        let players = [];

        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM Players WHERE CardTypeID = ? ;", [cardTypeID], (err, rows) => {
            if (err) {
                console.error('❌ Query error:', err);
                return reject(err);
            }

            //console.log(rows);
            
            rows.forEach(row => {
                let player = new Player(row.ID,row.PlayerName,row.CardTypeID,row.Position,row.Age, row.Rating, row.Team, row.League, row.Height, row.Weight, row.Crossing, row.Finishing, row.Heading, row.Jumping, row.Penalties, row.WeakFoot, row.SkillMoves,row.Passing, row.Defending, row.Attacking, row.Country, row.URL, row.Gender,row.Boost);
                players.push(player);
            });

            return resolve(players);
            });
        });
    }

    static async InsertPlayer(player){

        db = ConnectToDB();
        let params = [player.mPlayerName,player.mCardTypeID,player.mPosition,player.mAge,player.mRating, player.mTeam, player.mHeight,player.mWeight,player.mCrossing,player.mFinishing,player.mHeading,player.mJumping,player.mPenalties,player.mWeakFoot,player.mSkillMoves,player.mPassing,player.mDefending,player.mAttacking,player.mCountry,player.mURL,player.mGender,player.mBoost]
        return new Promise((resolve, reject) => {
            db.run("INSERT INTO Players(PlayerName,CardTypeID,Position,Age,Rating,Team,Height,Weight,Crossing,Finishing,Heading,Jumping,Penalties,WeakFoot,SkillMoves,Passing,Defending,Attacking,Country,URL,Gender,Boost) VALUES(?, ?, ?,?, ?, ?,?, ?, ?,?, ?, ?,?, ?, ?,?, ?, ?, ?, ?, ?, ?)",params,function(err){
             if (err) {
                console.error('❌ Query error:', err);
                return reject(err);
            }
            //console.log(this.changes);
            //console.log("Inserted into DB " + this.lastID);
            return resolve(this.lastID);
            });
        });
    }

    static async RetrievePackablePromoPlayers(minRating,maxRating){
        db = ConnectToDB();
        let players = [];

        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM PromoPlayers WHERE Packable = 1 ;", [],(err, rows) => {
            if (err) {
                console.error('❌ Query error:', err);
                return reject(err);
            }

            //console.log(rows);
            
            rows.forEach(async row => {
                let correspondingPlayer = await Player.RetrievePlayerByID(row.PromoPlayerID);
                if(correspondingPlayer.mRating <= maxRating && correspondingPlayer.mRating >= minRating){
                    players.push(correspondingPlayer);
                }
            });

            return resolve(players);
            });
        });
    }

    static async ReplaceIfPromo(player){
        db = ConnectToDB();
        //console.log(player);

        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM PromoPlayers WHERE BasePlayerID = ? ;", [player.mID],async (err, row) => {
                if (err) {
                    console.error('❌ Query error:', err);
                    return reject(err);
                }

                //console.log(rows);

                if(row){
                    player = await Player.RetrievePlayerByID(row.PromoPlayerID); 
                }

                return resolve(player);
            });
        });
    }

    static sort(playerA,playerB){
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
                return 1;
            }
            else if(cardTypeAPriority > cardTypeBPriority){
                return -1;
            }
            else{
                return 0;
            }
        }
    }


}


function ConnectToDB(){
    try{
        db = new sqlite3.Database("botDB.db");
    }
    catch(error){
        console.log(error);
    }
    return db;
}

module.exports = Player;