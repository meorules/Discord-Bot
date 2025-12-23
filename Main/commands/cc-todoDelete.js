const { SlashCommandBuilder } = require('discord.js');

const Team = require('../modules/team.js');
const Note = require('../modules/todoitem.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('todo-delete')
        .setDescription('Delete a todo item')
        .addIntegerOption(
            option => option.setName('position')
            .setDescription('The note position of the todo item to delete.')
            .setRequired(true)
        ),
    async execute(interaction) {
        let commandUsername = interaction.user.username;
        let positionValue = interaction.options.getInteger("position");

        let team = await Team.RetrieveTeamByUser(commandUsername);
        if (!team) {
            interaction.reply("You do not own a team. Please create one first using /team-create.");
            return;
        }

        currentNote = await Note.RetrieveNoteByPosition(team.mID, positionValue);

        let changes = await Note.DeleteNoteByID(currentNote.mID);
        if(changes > 0){
            replyString = `✅ Deleted todo item at position ${positionValue}.`;
        }
        else{
            replyString = `❌ Failed to delete todo item at position ${positionValue}.`;
        }
        interaction.followUp(`${replyString}`)

        return;
    },
};