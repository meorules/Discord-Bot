const { SlashCommandBuilder } = require('discord.js');

const Wordle = require('../../Wordle/wordle.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('wordle-play')
        .setDescription('Starts up a new game of wordle for the user who calls it.')
        .addStringOption((option) =>
            option
            .setName("guess")
            .setRequired(true)
            .setDescription("Your guess, can be lowercase or uppercase"),
        ),
    async execute(interaction) {

        Wordle.PlayWordle(interaction);

        return;
    },
};