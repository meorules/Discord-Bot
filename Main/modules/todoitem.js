const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

class Note {

    constructor(id, teamID, note, notePosition, dueDate, isCompleted){
        this.mID = id;
        this.mTeamID = teamID;
        this.mNote = note;
        this.mNotePosition = notePosition;
        this.mDueDate = dueDate;
        this.mIsCompleted = isCompleted;
    }

    setAttributes(id, teamID, note, notePosition, dueDate, isCompleted){
        this.mID = id;
        this.mTeamID = teamID;
        this.mNote = note;
        this.mNotePosition = notePosition;
        this.mDueDate = dueDate;
        this.mIsCompleted = isCompleted;
    }

    stringify(){
        if(this.mID != -1){
            let noteString = this.mNotePosition + ". ";
            if(this.mIsCompleted){
                noteString += "✅ ";
            }
            else{
                noteString += "❌ ";
            }
            noteString += this.mNote + " (Due: " + this.mDueDate + ")";
            return noteString;
        }
        else return "Invalid Note";
    }

    static async RetrieveNoteByID(id){
    
        let db = await ConnectToDB();

        try{
            const row = await db.get("SELECT * FROM TeamTodo WHERE ID = ? ;", [id]);
            const noteToReturn = new Note(row.ID,row.TeamID,row.Note,row.NotePosition,row.DueDate,row.IsCompleted);

            return noteToReturn;
        }
        catch(err){
            console.error('❌ Query error:', err);
        }
    }

    static async RetrieveNoteByPosition(teamID, position){
    
        let db = await ConnectToDB();
        try{
            const row = await db.get("SELECT * FROM TeamTodo WHERE TeamID = ? AND NotePosition = ? ;", [teamID, position]);
            const noteToReturn = new Note(row.ID,row.TeamID,row.Note,row.NotePosition,row.DueDate,row.IsCompleted);
            return noteToReturn;
        }
        catch(err){
            console.error('❌ Query error:', err);
        }
    }

    static async DeleteNoteByID(id){
        let db = await ConnectToDB();

        try{
            const result = await db.run("DELETE FROM TeamTodo WHERE ID = ? ;", [id]);
            return result.changes;
        }
        catch(err){
            console.error('❌ Query error:', err);
        }
    }

    static async RetrieveNotesByTeamID(teamID){
    
        let db = await ConnectToDB();
        let notesToReturn = [];

        try{
            const rows = await db.all("SELECT * FROM TeamTodo WHERE TeamID = ? ORDER BY NotePosition ASC ;", [teamID]);
            for(const row of rows){
                const note = new Note(row.ID,row.TeamID,row.Note,row.NotePosition,row.DueDate,row.IsCompleted);
                notesToReturn.push(note);
            }
            return notesToReturn;
        }
        catch(err){
            console.error('❌ Query error:', err);
        }
    }

    static async CreateNote(teamID, note, dueDate){
        let db = await ConnectToDB();
        if(!dueDate){
            dueDate = "None";
        }
        try{
            const result = await db.run("INSERT INTO TeamTodo(TeamID, Note, NotePosition, DueDate, IsCompleted) VALUES(?, ?, (SELECT IFNULL(MAX(NotePosition),0) + 1 FROM TeamTodo WHERE TeamID = ?), ?, 0)",[teamID, note, teamID, dueDate]);
            var retrievedNote = this.RetrieveNoteByID(result.lastID);
            return retrievedNote;
        }
        catch(err){
            console.error('❌ Query error:', err);
        }
    }

    
    static async EditNote(note,parameterName,newValue){
        let db = await ConnectToDB();
        try{
            if(parameterName == "Value"){
                note.mNote = newValue;
                const result = await db.run('UPDATE TeamTodo SET Note = ? WHERE ID = ?;',[newValue, note.mID]);
                return note;
            }
            else if(parameterName == "DueDate"){
                note.mDueDate = newValue;
                const result = await db.run('UPDATE TeamTodo SET DueDate = ? WHERE ID = ?;',[newValue, note .mID]);
                return note;
            }
            else if(parameterName == "IsCompleted"){
                note.mIsCompleted = newValue;
                const result = await db.run('UPDATE TeamTodo SET IsCompleted = ? WHERE ID = ?;',[newValue, note.mID]);
                return note;
            }
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

module.exports = Note;
