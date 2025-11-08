const {
    SlashCommandBuilder,
    ContextMenuCommandAssertions,
} = require("discord.js");

function generateRandomNumber(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored + 1 - minCeiled) + minCeiled);
}

function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}

function generateRandomNumbers(amount, min, max) {
    let numbers = [];
    for (let i = 0; i < amount; i++) {
        numbers[i] = generateRandomNumber(min, max);
    }
    return numbers;
}

function populateUnshuffledArray(min, max) {
    let numbers = [];
    let counter = min;
    for (let i = 0; i < max; i++) {
        numbers[i] = counter++;
    }
    return numbers;
}

function rngString(amount, min, max,ordered,unique) {
    let numbers = [];
    generatedString = "";
    if(unique){
        unshuffled = populateUnshuffledArray(min,max);
        numbers = shuffle(unshuffled);
        generatedString = generatedString + "Unique ";
        numbers.length = amount;
    }
    else{
        numbers = generateRandomNumbers(amount, min, max);
        generatedString = generatedString + "Non Unique ";
    }

    if(ordered){
        numbers.sort((a, b) => a - b);
        generatedString = generatedString + "Ordered ";
    }
    else{
        generatedString = generatedString + "Unordered ";
    }
    size = numbers.length;
    
    generatedString = generatedString +
        size +
        " numbers were generated between " +
        min +
        " and " +
        max +
        ". The numbers are: ";
    for (let i = 0; i < size; i++) {
        generatedString = generatedString + numbers[i] + ", ";
    }
    generatedString = generatedString.slice(0, generatedString.length - 2);

    return generatedString;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("randomise")
        .setDescription(
            "Randomise numbers",
        )
        .addIntegerOption((option) =>
            option
            .setName("min")
            .setRequired(true)
            .setDescription("The minimum number to generate (inclusive)"),
        )
        .addIntegerOption((option) =>
            option
            .setName("max")
            .setRequired(true)
            .setDescription("The maximum number to generate (inclusive)"),
        )
        .addIntegerOption((option) =>
            option
            .setName("count")
            .setRequired(false)
            .setDescription("The number of numbers to generate"),
        )
        .addStringOption((option) =>
            option
            .setName("ordered")
            .addChoices({ name: "Ordered", value: "1" }, { name: "Unordered", value: "0" })
            .setRequired(false)
            .setDescription("Order the randomizations or no"),
        )
        .addStringOption((option) =>
            option
            .setName("unique")
            .addChoices({ name: "Unique", value: "1" }, { name: "Duplicates Allowed", value: "0" })
            .setRequired(false)
            .setDescription("Generate only Unique Numbers"),
        ),
    async execute(interaction) {
        min = interaction.options.getInteger("min");
        max = interaction.options.getInteger("max");
        count = interaction.options.getInteger("count");
        orderedString = interaction.options.getString("ordered");
        uniqueString = interaction.options.getString("unique");
        ordered = false;
        unique = false;
        if(uniqueString == "1"){
            unique = true;
        }
        if(orderedString == "1"){
            ordered = true;
        }
        if (count == null) {
            count = 1;
        }
        try {
            rngedString = rngString(count, min, max, ordered, unique);
        } catch (error) {
            console.error(error);
        }

        return interaction.reply(`${rngedString}`);
    },
};