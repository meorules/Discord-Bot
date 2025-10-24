const sqlite3 = require('sqlite3');


class Player{
    constructor(id, name, cardTypeId, position,age, rating, team, league, height, weight, crossing, finishing, heading, jumping, penalties, weakFoot, skillMoves, passing, defending, attacking,country, url, gender){
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
    }

    setAttributes(id, name, cardTypeId, position,age, rating, team, league, height, weight, crossing, finishing, heading, jumping, penalties, weakFoot, skillMoves, passing, defending, attacking,country, url, gender){
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

            PlayerToReturn.setAttributes(row.ID,row.PlayerName,row.CardTypeID,row.Position,row.Age, row.Rating, row.Team, row.League, row.Height, row.Weight, row.Crossing, row.Finishing, row.Heading, row.Jumping, row.Penalties, row.WeakFoot, row.SkillMoves,row.Passing, row.Defending, row.Attacking, row.Country, row.URL, row.Gender);
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
                PlayerToReturn.setAttributes(row.ID,row.PlayerName,row.CardTypeID,row.Position,row.Age, row.Rating, row.Team, row.League, row.Height, row.Weight, row.Crossing, row.Finishing, row.Heading, row.Jumping, row.Penalties, row.WeakFoot, row.SkillMoves,row.Passing, row.Defending, row.Attacking, row.Country, row.URL, row.Gender);
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

            console.log(rows);
            
            rows.forEach(row => {
                let player = new Player(row.ID,row.PlayerName,row.CardTypeID,row.Position,row.Age, row.Rating, row.Team, row.League, row.Height, row.Weight, row.Crossing, row.Finishing, row.Heading, row.Jumping, row.Penalties, row.WeakFoot, row.SkillMoves,row.Passing, row.Defending, row.Attacking, row.Country, row.URL, row.Gender);
                players.push(player);
            });

            return resolve(players);
            });
        });
    }

    static async InsertPlayer(player){

        db = ConnectToDB();
        let params = [player.mPlayerName,player.mCardTypeID,player.mPosition,player.mAge,player.mRating, player.mTeam, player.mHeight,player.mWeight,player.mCrossing,player.mFinishing,player.mHeading,player.mJumping,player.mPenalties,player.mWeakFoot,player.mSkillMoves,player.mPassing,player.mDefending,player.mAttacking,player.mCountry,player.mURL,player.mGender]
        return new Promise((resolve, reject) => {
            db.run("INSERT INTO Players(PlayerName,CardTypeID,Position,Age,Rating,Team,Height,Weight,Crossing,Finishing,Heading,Jumping,Penalties,WeakFoot,SkillMoves,Passing,Defending,Attacking,Country,URL,Gender) VALUES(?, ?, ?,?, ?, ?,?, ?, ?,?, ?, ?,?, ?, ?,?, ?, ?, ?, ?, ?)",params,function(err){
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

}


function generateRandomNumber(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored + 1 - minCeiled) + minCeiled);
}

function generateRandomNumbers(amount, min, max) {
    let numbers = [];
    for (let i = 0; i < amount; i++) {
        numbers[i] = generateRandomNumber(min, max);
    }
    return numbers;
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