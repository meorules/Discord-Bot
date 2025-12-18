const { SlashCommandBuilder } = require('discord.js');

const Player = require('../modules/Player.js');
const Team = require('../modules/team.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('players-view')
        .setDescription('View Players by their ID')
        .addStringOption(option => option.setName('ids').setDescription('IDs of the player you want to view, seperated by commas').setRequired(false))
        .addStringOption(option => option.setName('names').setDescription('Names of the player you want to view, seperated by commas').setRequired(false))
        .addIntegerOption((option) =>
            option
            .setName("page")
            .setRequired(false)
            .setDescription("Each page is 18 players"),
        ),
    async execute(interaction) {
        let ids = interaction.options.getString("ids") ? interaction.options.getString("ids").split(",") : [];
        let names = interaction.options.getString("names") ? interaction.options.getString("names").split(",") : [];
        let page = interaction.options.getInteger("page") || 1;

        let players = [];

        for(let id of ids){
            let player = await Player.RetrievePlayerByID(id.trim());
            if(player){
                players.push(player);
            }
        }
        for(let name of names){
            let playersByName = await Player.RetrievePlayersByName(name.trim());
            if(playersByName.length > 0){
                players.push(...playersByName);
            }
        }
        let generatedString  = "";

        
        playerStart = (page-1)*18;
        if (page == 1) {
            playerStart = 0;
        }
        playersEnd = playerStart + 18;
        condensedPlayers = players.slice(playerStart,playersEnd);

        if(players.length > 0 ){
            generatedString = "The following players were found:\nPage " + page + " - Players "+ (playerStart+1) + "-" + (playersEnd) +  " out of " + players.length +" total players \n";
            for(let player of condensedPlayers){
                generatedString += "ID(" + player.mID + ") " + await player.stringify() + "\n";
            }
            return interaction.followUp(generatedString);
        } else {
            return interaction.followUp("No players found with the provided IDs.");
        }
    },
};