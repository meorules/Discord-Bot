const { SlashCommandBuilder } = require('discord.js');

const Player = require('../modules/Player.js');
const Team = require('../modules/team.js');
const Lineup = require('../modules/Lineup.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lineup-assign')
        .setDescription('Edit the position of a player in your lineup')
        .addStringOption(option => option.setName('player').setDescription('Player Name').setRequired(true))
        .addStringOption(option => option.setName('position').setDescription('Position').setRequired(false))
        .addIntegerOption(option => option.setName('boost').setDescription('Boost Value').setRequired(false)),
    async execute(interaction) {
        let player = interaction.options.getString("player");
        let position = interaction.options.getString("position");
        let boost = interaction.options.getInteger("boost");
        let username = interaction.user.username;

        if(!position && !boost){
            return interaction.followUp('You must provide at least a new position or a boost value to assign.');
        }
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
            if(position){
                lineup = await Lineup.EditLineupPlayerPositionOrBoost(team.mID,player,"Position",position,changesMade);
            }
            if(boost){
                lineup = await Lineup.EditLineupPlayerPositionOrBoost(team.mID,player,"Boost",boost,changesMade);
            }
            if(!changesMade.result){
                return interaction.followUp(`Could not find player ${player} on your team.`);
            }
        }

        return interaction.followUp(`The player was edited successfully: \n ${await lineup.stringify()}`);
    },
};