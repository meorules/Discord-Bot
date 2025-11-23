const { SlashCommandBuilder } = require('discord.js');

const Player = require('../modules/Player.js');
const Team = require('../modules/team.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('players-view')
        .setDescription('View Players by their ID')
        .addStringOption(option => option.setName('ids').setDescription('IDs of the player you want to view, seperated by commas').setRequired(false))
        .addStringOption(option => option.setName('names').setDescription('Names of the player you want to view, seperated by commas').setRequired(false)),
    async execute(interaction) {
        let ids = interaction.options.getString("ids") ? interaction.options.getString("ids").split(",") : [];
        let names = interaction.options.getString("names") ? interaction.options.getString("names").split(",") : [];

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
        if(players.length > 0 ){
            generatedString = "The following players were found:\n";
            for(let player of players){
                generatedString += "ID(" + player.mID + ") " + await player.stringify() + "\n";
            }
            return interaction.reply(generatedString);
        } else {
            return interaction.reply("No players found with the provided IDs.");
        }
    },
};