const { SlashCommandBuilder } = require('discord.js');

const Player = require('../modules/Player.js');
const Team = require('../modules/team.js');
const fs = require('node:fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('money-leaderboard')
        .setDescription('Retrieve an ordered list of team balances.'),
    async execute(interaction) {

        let generatedString = "**__" + interaction.guild.name + "'s Leaderboard __** \n"; 
        let teams = await Team.RetrieveAllTeams();
        teams.sort(Team.sort);
        let order = 1;
        for(let team in teams){
            generatedString = generatedString + order + ". " + teams[team].stringify(false,true) + "\n";
            order++;
        }

        return interaction.reply(generatedString);
    },
};