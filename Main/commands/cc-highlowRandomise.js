const { SlashCommandBuilder } = require('discord.js');

function generateRandomNumber(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored + 1 - minCeiled) + minCeiled);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('highlow-randomise')
        .setDescription('Randomise a High/Low Player Link'),
    async execute(interaction) {


        let generatedNumber = generateRandomNumber(0, 16342);
        await interaction.followUp(`This number is ${generatedNumber} and the link is:\nhttps://sofifa.com/players?type=all&pn%5B0%5D=27&pn%5B1%5D=25&pn%5B2%5D=23&pn%5B3%5D=22&pn%5B4%5D=21&pn%5B5%5D=20&pn%5B6%5D=18&pn%5B7%5D=16&pn%5B8%5D=14&pn%5B9%5D=12&pn%5B10%5D=10&pn%5B11%5D=8&pn%5B12%5D=7&pn%5B13%5D=5&pn%5B14%5D=3&pn%5B15%5D=2&offset=${generatedNumber}`);

        return;
    },
};