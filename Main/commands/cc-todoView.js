const { SlashCommandBuilder } = require('discord.js');

const Team = require('../modules/team.js');
const Note = require('../modules/todoitem.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('todo-view')
        .setDescription('View your current todo list'),
    async execute(interaction) {
        let commandUsername = interaction.user.username;

        let team = await Team.RetrieveTeamByUser(commandUsername);
        let notes = await Note.RetrieveNotesByTeamID(team.mID);
        if(notes){
            replyString = await team.stringify();
            for(note of notes){
                replyString += `\n${await note.stringify()}`;
            }
            interaction.followUp(`${replyString}`)
        }
        else{
            interaction.followUp(`You do not have any note items yet, please create one using /todo-add`);
        }

        return;
    },
};