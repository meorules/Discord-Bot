const { SlashCommandBuilder } = require('discord.js');

const Player = require('../modules/Player.js');
const Team = require('../modules/team.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('View your balance')
        .addUserOption((option) =>
            option
            .setName("username")
            .setRequired(false)
            .setDescription("Username to check the balance, if not yourself"),
        ),
    async execute(interaction) {
        let retrievedUsername = interaction.options.getUser("username");
        let commandUsername = interaction.user.username;
        let username ;

        if(retrievedUsername){

            username = retrievedUsername.username;
        }
        else{
            username = commandUsername;
        }
        

        team = await Team.RetrieveTeamByUser(username);
        //console.log(team)

        generatedString = team.stringify(false,true);

        return interaction.reply(generatedString);
    },
};