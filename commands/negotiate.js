const {
    SlashCommandBuilder,
    ContextMenuCommandAssertions,
} = require("discord.js");

function generateRandomNumber(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored + 1 - minCeiled) + minCeiled);
}

function generateRandomNumbers(amount, min, max) {
    let numbers = [];
    for (let i = 0; i < amount; i++) {
        numbers[i] = generateRandomNumber(min, max);
    }
    return numbers;
}

function sell(value,tier){
    transaction = {choice:"Sell",modifier:"",newvalue:0};
    switch(tier){
        case 0:
            mod = generateRandomNumber(0,1);
            switch(mod){
                case 0:
                    transaction.modifier = "1x";
                    transaction.newvalue = 1 * value;
                    break;
                case 1:
                    transaction.modifier = "1.25x";
                    transaction.newvalue = 1.25 * value;
                    break;
            }
            break;
        case 1:
            mod = generateRandomNumber(0,2);
            switch(mod){
                case 0:
                    transaction.modifier = "1x";
                    transaction.newvalue = 1 * value;
                    break;
                case 1:
                    transaction.modifier = "1.25x";
                    transaction.newvalue = 1.25 * value;
                    break;
                case 2:
                    transaction.modifier = "1.35x";
                    transaction.newvalue = 1.35 * value;
                    break;
            }
            break;
        case 2:
            mod = generateRandomNumber(0,2);
            switch(mod){
                case 0:
                    transaction.modifier = "1.25x";
                    transaction.newvalue = 1.25 * value;
                    break;
                case 1:
                    transaction.modifier = "1.35x";
                    transaction.newvalue = 1.35 * value;
                    break;
                case 2:
                    transaction.modifier = "1.5x";
                    transaction.newvalue = 1.5 * value;
                    break;
            }
            break;
        case 3:
            mod = generateRandomNumber(0,3);
            switch(mod){
                case 0:
                    transaction.modifier = "1.25x";
                    transaction.newvalue = 1.25 * value;
                    break;
                case 1:
                    transaction.modifier = "1.35x";
                    transaction.newvalue = 1.35 * value;
                    break;
                case 2:
                    transaction.modifier = "1.5x";
                    transaction.newvalue = 1.5 * value;
                    break;
                case 3:
                    transaction.modifier = "1.65x";
                    transaction.newvalue = 1.65 * value;
                    break;
            }
            break;
        case 4:
            mod = generateRandomNumber(1,3);
            switch(mod){
                case 1:
                    transaction.modifier = "1.35x";
                    transaction.newvalue = 1.35 * value;
                    break;
                case 2:
                    transaction.modifier = "1.5x";
                    transaction.newvalue = 1.5 * value;
                    break;
                case 3:
                    transaction.modifier = "1.65x";
                    transaction.newvalue = 1.65 * value;
                    break;
            }
            break;
    }
    return transaction;
}

function buy(value,tier){
    transaction = {choice:"Buy",modifier:"",newvalue:0};
    switch(tier){
        case 0:
            transaction.modifier = "0%";
            transaction.newvalue = 1 * value;
            break;
        case 1:
            mod = generateRandomNumber(0,1);
            switch(mod){
                case 0:
                    transaction.modifier = "0%";
                    transaction.newvalue = 1 * value;
                    break;
                case 1:
                    transaction.modifier = "5%";
                    transaction.newvalue = 0.95 * value;
                    break;
            }
            break;
        case 2:
            mod = generateRandomNumber(0,2);
            switch(mod){
                case 0:
                    transaction.modifier = "0%";
                    transaction.newvalue = 1 * value;
                    break;
                case 1:
                    transaction.modifier = "5%";
                    transaction.newvalue = 0.95 * value;
                    break;
                case 2:
                    transaction.modifier = "10%";
                    transaction.newvalue = 0.90 * value;
                    break;
            }
            break;
        case 3:
            mod = generateRandomNumber(0,2);
            switch(mod){
                case 0:
                    transaction.modifier = "5%";
                    transaction.newvalue = 0.95 * value;
                    break;
                case 1:
                    transaction.modifier = "10%";
                    transaction.newvalue = 0.90 * value;
                    break;
                case 2:
                    transaction.modifier = "15%";
                    transaction.newvalue = 0.85 * value;
                    break;
            }
            break;
        case 4:
            mod = generateRandomNumber(1,2);
            switch(mod){
                case 1:
                    transaction.modifier = "10%";
                    transaction.newvalue = 0.90 * value;
                    break;
                case 2:
                    transaction.modifier = "15%";
                    transaction.newvalue = 0.85 * value;
                    break;
            }
            break;
    }
    return transaction;
}

function generateString(value,transaction) {
    generatedString = "";
    if(transaction.choice == "Sell"){
        generatedString = "You are selling a player with the value " + value + ", with a multipler of " + transaction.modifier + " and therefore the final value is " + transaction.newvalue;
    }
    else if(transaction.choice == "Buy"){
        generatedString = "You are buying a player with the value " + value + ", with a discount of " + transaction.modifier + " and therefore the final value is " + transaction.newvalue;
    }
    else{
        throw("Exception generating string, buy or sell choice was undetermined.");
    }

    return generatedString;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("negotiate")
        .setDescription(
            "Get Values back using your negotiator",
        )
        .addIntegerOption((option) =>
            option
            .setName("value")
            .setRequired(true)
            .setDescription("The player value to calculate"),
        )
        .addStringOption((option) =>
            option
            .setName("negotiator")
            .addChoices({ name: "T0", value: "0" }, { name: "T1", value: "1" },{ name: "T2", value: "2" }, { name: "T3", value: "3" },{ name: "T4", value: "4" })
            .setRequired(true)
            .setDescription("Upstream or Downstream"),
        )
        .addStringOption((option) =>
            option
            .setName("transaction")
            .addChoices({ name: "Buy", value: "0" }, { name: "Sell", value: "1" })
            .setRequired(true)
            .setDescription("Buy or Sell"))
            ,
    async execute(interaction) {
        value = interaction.options.getInteger("value");
        tier = interaction.options.getString("negotiator");
        tierInt = parseInt(tier);
        choice = interaction.options.getString("transaction");
    
        if (choice == "1") {
            transaction = buy(value,tierInt);
        }
        else if (choice == "0"){
            transaction = sell(value,tierInt);
        }
        else{
            throw("An error, something was provided incorrectly in the parameters");
        }

        try {
            string = generateString(value,transaction);
        } catch (error) {
            console.error(error);
        }

        return interaction.reply(`${string}`);
    },
};