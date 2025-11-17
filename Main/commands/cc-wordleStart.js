const { SlashCommandBuilder } = require('discord.js');

const Wordle = require('../../Wordle/wordle.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('wordle-start')
        .setDescription('Starts up a new game of wordle for the user who calls it.'),
    async execute(interaction) {

        Wordle.LoadNewWordle(interaction);

        return;
    },
};