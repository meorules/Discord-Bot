const { SlashCommandBuilder } = require('discord.js');

const Wordle = require('../../Wordle/wordle.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('wordle-stats')
        .setDescription('Shows your all time wordle stats'),
    async execute(interaction) {

        Wordle.ShowWordleStats(interaction);

        return;
    },
};