const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

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
        this.mUpgrade = 0;
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

    upgrade(amount){
        this.mUpgrade = amount;
        this.mRating += amount;
        this.mCrossing += amount;
        this.mFinishing += amount;
        this.mHeading += amount;
        this.mJumping += amount;
        this.mPenalties += amount;
        this.mPassing += amount;
        this.mDefending += amount;
        this.mAttacking += amount;
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
            toReturn += ":male_sign: ";
        }
        else{
            toReturn += ":female_sign: ";
        }

        //Add Boost tag if there is one
        if(this.mBoost == 1){
            toReturn += " :sparkles:";
        }

        if(this.mUpgrade > 0 ){
            toReturn += " :arrow_up: +" + this.mUpgrade;
        }
        else if(this.mUpgrade < 0 ){
            toReturn += " :arrow_down: " + this.mUpgrade;
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
        
        let db = await ConnectToDB();

        try{
            let row = await db.get("SELECT * FROM Players WHERE ID = ? ;", [id]);
            if(row){
                const PlayerToReturn = new Player(row.ID,row.PlayerName,row.CardTypeID,row.Position,row.Age, row.Rating, row.Team, row.League, row.Height, row.Weight, row.Crossing, row.Finishing, row.Heading, row.Jumping, row.Penalties, row.WeakFoot, row.SkillMoves,row.Passing, row.Defending, row.Attacking, row.Country, row.URL, row.Gender,row.Boost);

                return PlayerToReturn;
            }
        }
        catch(err){
            console.error('❌ Query error:', err);
        }

    }

    static async RetrievePlayerByName(name,ignoreID){

        let db = await ConnectToDB();
        name = '%' + name + '%';
        let params = [];
        params.push(name);

        let baseSQL = "SELECT * FROM Players WHERE PlayerName LIKE ? "

        if(ignoreID){
            baseSQL = baseSQL + "AND ID != ?;"
            params.push(ignoreID);
        }
        else{
            baseSQL = baseSQL + ";";
        }

        try{
            const row = await db.get(baseSQL, params);
            
            if(row){
                const PlayerToReturn = new Player(row.ID,row.PlayerName,row.CardTypeID,row.Position,row.Age, row.Rating, row.Team, row.League, row.Height, row.Weight, row.Crossing, row.Finishing, row.Heading, row.Jumping, row.Penalties, row.WeakFoot, row.SkillMoves,row.Passing, row.Defending, row.Attacking, row.Country, row.URL, row.Gender,row.Boost);
                //console.log(PlayerToReturn);
                return PlayerToReturn;
            }
            else{
                return null;
            }
        }
        catch(err){
            console.error('❌ Query error:', err);
        }
    }

    static async RetrievePlayersByRating(rating){
    
        let db = await ConnectToDB();

        let players = [];
        try{
            const rows = await db.all("SELECT * FROM Players WHERE Rating = ? ;", [rating]);

            rows.forEach(row => {
                let player = new Player(row.ID,row.PlayerName,row.CardTypeID,row.Position,row.Age, row.Rating, row.Team, row.League, row.Height, row.Weight, row.Crossing, row.Finishing, row.Heading, row.Jumping, row.Penalties, row.WeakFoot, row.SkillMoves,row.Passing, row.Defending, row.Attacking, row.Country, row.URL, row.Gender,row.Boost);
                players.push(player);
            });

            return players;
        }
        catch(err){
            console.error('❌ Query error:', err);
        }
    }

    
    static async RetrievePlayersByCardType(cardTypeID){
    
        let db = await ConnectToDB();

        let players = [];

        if(cardTypeID>5){
            let placeholderPlayers = await this.RetrievePackablePromoPlayers(50,99);
            for(let player in placeholderPlayers){
                if(placeholderPlayers[player].mCardTypeID == cardTypeID){
                   players.push(placeholderPlayers[player]);
                }
            }
            return players;
        }
        else{

            try{
                const rows = await db.all("SELECT * FROM Players WHERE CardTypeID = ? ;", [cardTypeID]);

                rows.forEach(row => {
                    let player = new Player(row.ID,row.PlayerName,row.CardTypeID,row.Position,row.Age, row.Rating, row.Team, row.League, row.Height, row.Weight, row.Crossing, row.Finishing, row.Heading, row.Jumping, row.Penalties, row.WeakFoot, row.SkillMoves,row.Passing, row.Defending, row.Attacking, row.Country, row.URL, row.Gender,row.Boost);
                    players.push(player);
                });

                return players;
            }
            catch(err){
                console.error('❌ Query error:', err);
            }
        }
        
    }

    static async InsertPlayer(player){

        let db = await ConnectToDB();
        let params = [player.mPlayerName,player.mCardTypeID,player.mPosition,player.mAge,player.mRating, player.mTeam, player.mHeight,player.mWeight,player.mCrossing,player.mFinishing,player.mHeading,player.mJumping,player.mPenalties,player.mWeakFoot,player.mSkillMoves,player.mPassing,player.mDefending,player.mAttacking,player.mCountry,player.mURL,player.mGender,player.mBoost]
        try{
            const result = await db.run("INSERT INTO Players(PlayerName,CardTypeID,Position,Age,Rating,Team,Height,Weight,Crossing,Finishing,Heading,Jumping,Penalties,WeakFoot,SkillMoves,Passing,Defending,Attacking,Country,URL,Gender,Boost) VALUES(?, ?, ?,?, ?, ?,?, ?, ?,?, ?, ?,?, ?, ?,?, ?, ?, ?, ?, ?, ?)",params);
            return result.lastID;
        }
        catch(err){
            console.error('❌ Query error:', err);
        }
    }

    static async RetrievePackablePromoPlayers(minRating,maxRating){
        let db = await ConnectToDB();
        let players = [];
        try{
            const rows = await db.all("SELECT * FROM PromoPlayers WHERE Packable = 1 ;", []);

            for(const row of rows){
                let correspondingPlayer = await Player.RetrievePlayerByID(row.PromoPlayerID);
                if(correspondingPlayer.mRating <= maxRating && correspondingPlayer.mRating >= minRating){
                    players.push(correspondingPlayer);
                }
            };

            return players;
        }
        catch(err){
            console.error('❌ Query error:', err);
        }

    }

    static async ReplaceIfPromo(player){
        let db = await ConnectToDB();
        //console.log(player);

        try{
            const row = await db.get("SELECT * FROM PromoPlayers WHERE BasePlayerID = ? ;", [player.mID]);

            if(row){
                player = await Player.RetrievePlayerByID(row.PromoPlayerID); 
            }

            return player;
        }
        catch(err){
            console.error('❌ Query error:', err);
        }
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

module.exports = Player;