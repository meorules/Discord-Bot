const { SlashCommandBuilder } = require('discord.js');

function generateRandomNumber(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored + 1 - minCeiled) + minCeiled);
}

function generateRandomNumbers(amount, min, max) {
    numbers[amount];
    for (let i = 0; i < amount; i++) {
        numbers[i] = generateRandomNumber(min, max);
    }
    return numbers;
}

function rngString(amount, min, max) {
    numbers = generateRandomNumbers(amount, min, max);
    size = numbers.size();
    generatedString = size + " numbers were generated between " + min + " and " + max + ". The numbers are: ";
    for (let i = 0; i < size; i++) {
        generatedString += numbers[i] + ",";
    }

    return generatedString;

}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('randomise')
        .setDescription('Get the avatar URL of the selected user, or your own avatar.')
        .addIntegerOption(option => option.setName('min').setDescription('The minimum number to generate (inclusive)'))
        .addIntegerOption(option => option.setName('max').setDescription('The maximum number to generate (inclusive)'))
        .addIntegerOption(option => option.setName('count').setDescription('The number of numbers to generate')),
    async execute(interaction) {
        min = interaction.options.getInteger('min');
        max = interaction.options.getInteger('max');
        count = interaction.options.getInteger('count');

        rngedString = rngString(count, min, max);

        const user = interaction.options.getUser('target');
        return interaction.reply(`${rngedString}`);
    },
};