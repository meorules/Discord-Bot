const { SlashCommandBuilder } = require('discord.js');

const Player = require('../modules/Player.js');
const Team = require('../modules/team.js');
const Lineup = require('../modules/Lineup.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lineup-set')
        .setDescription('Create a Lineup, if you have one, you can use this to set the formation')
        .addStringOption(option => option.setName('formation').setDescription('Your Lineup Formation! e.g. 4-4-2').setRequired(false)),
    async execute(interaction) {
        let formation = interaction.options.getString("formation");
        let username = interaction.user.username;

        let team = await Team.RetrieveTeamByUser(username);
        let lineup = await Lineup.RetrieveLineup(team.mID);
        let formationSwitched = false;
        if(lineup){
            formationSwitched = Lineup.SwitchFormation(lineup,formation);
        }
        else{
            lineup = await Lineup.CreateLineup(team.mID,formation);
        }
        if(formationSwitched){
            interaction.followUp(`The lineup had the formation changed: \n ${await lineup.stringify()}`);
        }
        else{
            interaction.followUp(`The lineup was created successfully: \n ${await lineup.stringify()}`)
        }

        return;
    },
};