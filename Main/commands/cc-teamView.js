const { SlashCommandBuilder } = require('discord.js');

const Player = require('../modules/Player.js');
const Team = require('../modules/team.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('team-view')
        .setDescription('View your team')        
        .addIntegerOption((option) =>
            option
            .setName("page")
            .setRequired(false)
            .setDescription("Each page is 18 players"),
        )
        .addUserOption((option) =>
            option
            .setName("username")
            .setRequired(false)
            .setDescription("Username to check the team for, if not yourself"),
        ),
    async execute(interaction) {
        let page = interaction.options.getInteger("page");
        let commandUsername = interaction.user.username;
        let retrievedUsername = interaction.options.getUser("username");
        let username = "";

        if(retrievedUsername){

            username = retrievedUsername.username;
        }
        else{
            username = commandUsername;
        }
        
        if (page == null) {
            page = 1;
        }

        team = await Team.RetrieveTeamByUser(username);
        //console.log(team);
        playerStart = (page-1)*18;
        if (page == 1) {
            playerStart = 0;
        }
        playersEnd = playerStart + 18;
        condensedPlayers = team.mPlayers.slice(playerStart,playersEnd);
        condensedPlayers.sort(Player.sort);
        if(playersEnd > team.mPlayers.length){
            playersEnd = team.mPlayers.length
        }

        generatedString = team.stringify(false) + " Players: Page " + page + " - Players "+ (playerStart+1) + "-" + (playersEnd) +  " out of " + team.mPlayers.length +" total players \n";



        for(player in condensedPlayers){
            generatedString = generatedString + await condensedPlayers[player].stringify() + "\n";
        }


        return interaction.reply(generatedString);
    },
};