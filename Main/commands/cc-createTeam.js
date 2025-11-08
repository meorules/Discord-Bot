const { SlashCommandBuilder } = require('discord.js');

const Player = require('../modules/Player.js');
const Team = require('../modules/team.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('team-create')
        .setDescription('Create a Team to store your packed players')
        .addStringOption(option => option.setName('name').setDescription('Your team Name!').setRequired(true))
        .addStringOption(option => option.setName('primaryemoji').setDescription('You can put an emoji here to be printed with your team name').setRequired(true))
        .addStringOption(option => option.setName('secondaryemoji').setDescription('You can put another emoji here to be printed with your team name').setRequired(true)),
    async execute(interaction) {
        let teamName = interaction.options.getString("name");
        let primaryEmoji = interaction.options.getString("primaryemoji");
        let secondaryEmoji = interaction.options.getString("secondaryemoji");
        let username = interaction.user.username;

        let teamID = await Team.CreateTeam(teamName,primaryEmoji,secondaryEmoji,username);
        team = await Team.RetrieveTeamByID(teamID);

        return interaction.reply(`The team was created succesfully: \n ${team.stringify(true)}`);
    },
};