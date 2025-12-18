const { SlashCommandBuilder } = require('discord.js');

const Player = require('../modules/Player.js');
const Team = require('../modules/team.js');
const Lineup = require('../modules/Lineup.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lineup-edit')
        .setDescription('Assign a player to your lineup')
        .addStringOption(option => option.setName('player').setDescription('Player Name').setRequired(true))
        .addIntegerOption(option => option.setName('position').setDescription('Lineup Position Number (1-18)').setRequired(true)),
    async execute(interaction) {
        let player = interaction.options.getString("player");
        let position = interaction.options.getInteger("position");
        let username = interaction.user.username;

        let team = await Team.RetrieveTeamByUser(username);
        if(!team){
            return interaction.followUp('You do not have a team set up yet, please create one using /team-create');
        }
        let lineup = await Lineup.RetrieveLineup(team.mID);
        if(!lineup){
            return interaction.followUp('You do not have a lineup set up yet, please create one using /lineup-set');
        }
        else{
            var changesMade;
            changesMade = {result: false};
            lineup = await Lineup.EditLineupPlayer(team.mID,player,position,changesMade);
            if(!changesMade.result){
                return interaction.followUp(`Could not find player ${player} on your team.`);
            }
        }

        return interaction.followUp(`The lineup was created successfully: \n ${await lineup.stringify()}`);
    },
};