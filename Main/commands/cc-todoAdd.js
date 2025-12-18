const { SlashCommandBuilder } = require('discord.js');

const Team = require('../modules/team.js');
const Note = require('../modules/todoitem.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('todo-add')
        .setDescription('Add a new todo item')
        .addStringOption(
            option => option.setName('note')
            .setDescription('The note you want to add, dont make it too long.')
            .setRequired(true)
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

        let team = await Team.RetrieveTeamByUser(commandUsername);
        let note = await Note.CreateNote(team.mID, noteValue, dueDateValue);
        let replyString = `✅ Added new todo item: "${await note.stringify()}"`;
        interaction.followUp(`${replyString}`)

        return;
    },
};