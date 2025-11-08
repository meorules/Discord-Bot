const { SlashCommandBuilder } = require('discord.js');

const Player = require('../modules/Player.js');
const Team = require('../modules/team.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('View your balance'),
    async execute(interaction) {
        let username = interaction.user.username;

        team = await Team.RetrieveTeamByUser(username);
        //console.log(team)

        generatedString = team.stringify(false,true);

        return interaction.reply(generatedString);
    },
};