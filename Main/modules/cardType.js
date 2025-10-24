const sqlite3 = require('sqlite3');

class CardType {
    constructor(cardTypeId,CardTypeName,emoji){
        this.mCardTypeID = cardTypeId;
        this.mCardType = CardTypeName;
        this.mEmoji = emoji;
    }

    setAttributes(cardTypeId,CardTypeName,emoji){
        this.mCardTypeID = cardTypeId;
        this.mCardType = CardTypeName;
        this.mEmoji = emoji;
    }

    static async RetrieveCardTypeByID(id){
    
        db = ConnectToDB();

        const cardTypeToReturn = new CardType();

        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM CardType WHERE CardTypeID = ? ;", [id], (err, row) => {
            if (err) {
            console.error('❌ Query error:', err);
            return reject(err);
            }

            cardTypeToReturn.setAttributes(row.CardTypeID,row.CardType,row.Emoji);

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

            cardTypeToReturn.setAttributes(row.CardTypeID,row.CardType,row.Emoji);

            return resolve(cardTypeToReturn);
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
