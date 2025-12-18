const { SlashCommandBuilder } = require('discord.js');

const Team = require('../modules/team.js');
const Note = require('../modules/todoitem.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('todo-edit')
        .setDescription('Edit todo item')
        .addIntegerOption(
            option => option.setName('position')
            .setDescription('The note position of the todo item to edit.')
            .setRequired(true)
        )
        .addBooleanOption(
            option => option.setName('iscompleted')
            .setDescription('Whether the todo item is completed or not.')
            .setRequired(false)
        )
        .addStringOption(
            option => option.setName('note')
            .setDescription('The note you want to add, dont make it too long.')
            .setRequired(false)
        )
        .addStringOption(
            option => option.setName('duedate')
            .setDescription('The due date for the todo item. Defaults to None.')
            .setRequired(false)
        ),
    async execute(interaction) {
        let commandUsername = interaction.user.username;
        let noteValue = interaction.options.getString("note");
        let dueDateValue = interaction.options.getString("duedate");
        let isCompletedValue = interaction.options.getBoolean("iscompleted");
        let positionValue = interaction.options.getInteger("position");

        let team = await Team.RetrieveTeamByUser(commandUsername);
        if (!team) {
            interaction.followUp("You do not own a team. Please create one first using /team-create.");
            return;
        }
        if(!noteValue && !dueDateValue && !isCompletedValue){
            interaction.followUp("You must provide at least one of the following: note, due date, or completion status.");
            return;
        }

        currentNote = await Note.RetrieveNoteByPosition(team.mID, positionValue);

        if(noteValue){
            currentNote = Note.EditNote(currentNote.mID,"Value",noteValue);
        }
        if(dueDateValue){
            currentNote = Note.EditNote(currentNote.mID,"DueDate",dueDateValue);
        }
        if(isCompletedValue !== null){
            currentNote = Note.EditNote(currentNote.mID,"IsCompleted",isCompletedValue);
        }
        let replyString = `Edit note: "${await currentNote.stringify()}"`;
        interaction.followUp(`${replyString}`)

        return;
    },
};