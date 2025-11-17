const { SlashCommandBuilder } = require('discord.js');

const Player = require('../modules/Player.js');
const Team = require('../modules/team.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('players-view')
        .setDescription('View Players by their ID')
        .addStringOption(option => option.setName('id').setDescription('IDs of the player you want to view, seperated by commas').setRequired(true)),
    async execute(interaction) {
        let ids = interaction.options.getString("id").split(",");

        let players = [];

        for(let id of ids){
            let player = await Player.RetrievePlayerByID(id.trim());
            if(player){
                players.push(player);
            }
        }
        let generatedString  = "";
        if(players.length > 0 ){
            generatedString = "The following players were found:\n";
            for(let player of players){
                generatedString += await player.stringify() + "\n";
            }
            return interaction.reply(generatedString);
        } else {
            return interaction.reply("No players found with the provided IDs.");
        }
    },
};