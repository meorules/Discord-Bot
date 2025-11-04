const sqlite3 = require('sqlite3');

mPriorityList = []
class CardType {

    static mPriorityList = [];
    constructor(cardTypeId,CardTypeName,emoji,priority){
        this.mCardTypeID = cardTypeId;
        this.mCardType = CardTypeName;
        this.mEmoji = emoji;
        this.mPriority = priority;
    }

    setAttributes(cardTypeId,CardTypeName,emoji,priority){
        this.mCardTypeID = cardTypeId;
        this.mCardType = CardTypeName;
        this.mEmoji = emoji;
        this.mPriority = priority;
    }

    stringify(){
        if(this.mCardTypeID != -1){
            return this.mCardType + " " + this.mEmoji;
        }
        else return "Invalid Card Type";
    }

    static async RetrieveCardTypeByID(id){
    
        db = ConnectToDB();

        const cardTypeToReturn = new CardType;

        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM CardType WHERE CardTypeID = ? ;", [id], (err, row) => {
            if (err) {
                console.error('❌ Query error:', err);
                return reject(err);
            }

            cardTypeToReturn.setAttributes(row.CardTypeID,row.CardType,row.Emoji,row.Priority);
            //console.log(row.CardTypeID);

            return resolve(cardTypeToReturn);
            });
        });
    }

    static async RetrieveCardTypeByName(name){
    
        db = ConnectToDB();

        name = '%' + name + '%';

        const cardTypeToReturn = new CardType();

        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM CardType WHERE CardType LIKE ? ;", [name], (err, row) => {
            if (err) {
            console.error('❌ Query error:', err);
            return reject(err);
            }

            cardTypeToReturn.setAttributes(row.CardTypeID,row.CardType,row.Emoji,row.Priority);

            return resolve(cardTypeToReturn);
            });
        });
    }

    static async PopulateCardTypePriority(){
        db = ConnectToDB();

        return new Promise((resolve,reject) => {
            db.all("SELECT * FROM CardType;", [], (err, rows) => {
            if (err) {
                console.error('❌ Query error:', err);
                return reject(err);
            }

            //console.log(rows);
            
            rows.forEach(row => {
                let cdToBeAdded = {"cardTypeID": row.CardTypeID,"priority": row.Priority};
                mPriorityList.push(cdToBeAdded);
            });
            
            return resolve(true);
            
            });
        });
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

module.exports = CardType;
