const { SlashCommandBuilder } = require('discord.js');

const Player = require('../modules/Player.js');
const Team = require('../modules/team.js');
const Lineup = require('../modules/Lineup.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lineup-assign')
        .setDescription('Edit the position of a player in your lineup')
        .addStringOption(option => option.setName('player').setDescription('Player Name').setRequired(true))
        .addStringOption(option => option.setName('position').setDescription('Position').setRequired(true)),
    async execute(interaction) {
        let player = interaction.options.getString("player");
        let position = interaction.options.getString("position");
        let username = interaction.user.username;

        let team = await Team.RetrieveTeamByUser(username);
        if(!team){
            return interaction.reply('You do not have a team set up yet, please create one using /team-create');
        }
        let lineup = await Lineup.RetrieveLineup(team.mID);
        if(!lineup){
            return interaction.reply('You do not have a lineup set up yet, please create one using /lineup-set');
        }
        else{
            var changesMade;
            changesMade = {result: false};
            lineup = await Lineup.EditLineupPlayerPosition(team.mID,player,position,changesMade);
            if(!changesMade.result){
                return interaction.reply(`Could not find player ${player} on your team.`);
            }
        }

        return interaction.reply(`The lineup was created successfully: \n ${await lineup.stringify()}`);
    },
};