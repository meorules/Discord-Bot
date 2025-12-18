const { SlashCommandBuilder,MessageFlags } = require('discord.js');

const Player = require('../modules/Player.js');
const Team = require('../modules/team.js');
const fs = require('node:fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('money-leaderboard')
        .setDescription('Retrieve an ordered list of team balances.')
        .addIntegerOption((option) =>
            option
            .setName("page")
            .setRequired(false)
            .setDescription("Each page is 18 players"),
        ),
    async execute(interaction) {

        let commandUsername = interaction.user.username;
        let page = interaction.options.getInteger("page") || 1;

        let teams = await Team.RetrieveAllTeams();
        teams.sort(Team.sort);

        teamsStart = (page-1)*20;
        if (page == 1) {
            teamsStart = 0;
        }
        teamsEnd = teamsStart + 20;
        condensedTeams = teams.slice(teamsStart,teamsEnd);
        if(teamsEnd > teams.length){
            teamsEnd = teams.length;
        }
        
        let generatedString = "**__" + interaction.guild.name + "'s Leaderboard __** Page " + page + " - Teams " + teamsStart + "-" + teamsEnd + ":\n"; 

        let order = 1;
        for(let team of condensedTeams){
            if(team.mDiscordUsername != commandUsername){
                generatedString = generatedString + order + ". " + team.stringify(false,true) + "\n";
            }
            else{
                generatedString = generatedString + "**" + order + ". " + team.stringify(false,true) + "**\n";
            }
            order++;
        }

        await interaction.followUp({ content: 'Generating Leaderboard', flags: MessageFlags.Ephemeral }); 


        await interaction.channel.send({ content: generatedString, fetchReply: false });

        return;
    },
};