const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

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
    
        let db = await ConnectToDB();

        try{
            const row = await db.get("SELECT * FROM CardType WHERE CardTypeID = ? ;", [id]);
            const cardTypeToReturn = new CardType(row.CardTypeID,row.CardType,row.Emoji,row.Priority);

            return cardTypeToReturn;
        }
        catch(err){
            console.error('❌ Query error:', err);
        }
    }

    static async RetrieveCardTypeByName(name){
    
        let db = await ConnectToDB();

        name = '%' + name + '%';

        try{
            const row = await db.get("SELECT * FROM CardType WHERE CardType LIKE ? ;", [name]);

            const cardTypeToReturn = new CardType(row.CardTypeID,row.CardType,row.Emoji,row.Priority);

            return cardTypeToReturn;
        }
        catch(err){
            console.error('❌ Query error:', err);
        }
    }

    static async PopulateCardTypePriority(){
        let db = await ConnectToDB();

        try{
            const rows = await db.all("SELECT * FROM CardType;", []);
            rows.forEach(row => {
                let cdToBeAdded = {"cardTypeID": row.CardTypeID,"priority": row.Priority};
                mPriorityList.push(cdToBeAdded);
            });
            
            return true;
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

module.exports = CardType;
