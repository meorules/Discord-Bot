const { SlashCommandBuilder } = require('discord.js');

const Player = require('../modules/Player.js');
const Team = require('../modules/team.js');
const { CardType } = require('../modules/cardType.js');

values =   [{ name: 'Silver Star', value: '6' },
  { name: 'POTW', value: '7' },
  { name: 'FutureStars', value: '8' },
  { name: 'Speed Demons', value: '9' },
  { name: 'Birthday', value: '10' }];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('promo-view')
        .setDescription('View Players by Promo')
        .addStringOption(option => option.setName('name').setDescription('Name of the promo').setRequired(false).addChoices(values)),
    async execute(interaction) {
        let cardTypeID = interaction.options.getString("name") || -1;

        let players = await Player.RetrievePlayersByCardType(cardTypeID,0);

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