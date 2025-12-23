const { SlashCommandBuilder } = require('discord.js');

const Team = require('../modules/team.js');
const Lineup = require('../modules/Lineup.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lineup-view')
        .setDescription('View your current lineup')
        .addUserOption((option) =>
            option
            .setName("username")
            .setRequired(false)
            .setDescription("Username to check the team for, if not yourself"),
        ),
    async execute(interaction) {
        let commandUsername = interaction.user.username;
        let retrievedUsername = interaction.options.getUser("username");
        let username = "";

        if(retrievedUsername){

            username = retrievedUsername.username;
        }
        else{
            username = commandUsername;
        }

        let team = await Team.RetrieveTeamByUser(username);
        let lineup = await Lineup.RetrieveLineup(team.mID);
        if(lineup){
            interaction.followUp(`${await lineup.stringify()}`)
        }
        else{
            interaction.followUp(`You do not have a lineup set up yet, please create one using /lineup-set`);
        }

        return;
    },
};