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

function upstream(rating){
    if (rating >= 83){
        return 0;
    }
    else if(rating >=81 && rating <83){
        return generateRandomNumber(0,1);
    }
    else if(rating >=79 && rating <81){
        return generateRandomNumber(0,2);
    }
    else if(rating >=76 && rating <79){
        return generateRandomNumber(1,3);
    }
    else if(rating <=75){
        return generateRandomNumber(2,3);
    }
    else {
        throw("Rating option was invalid");
    }
}


function downstream(rating){
    if (rating >= 82){
        return 0;
    }
    else if(rating >=80 && rating <82){
        return generateRandomNumber(0,1);
    }
    else if(rating >=77 && rating <79){
        return generateRandomNumber(0,2);
    }
    else if(rating >=74 && rating <77){
        return generateRandomNumber(0,3);
    }
    else if(rating <=73){
        return generateRandomNumber(1,3);
    }
    else {
        throw("Rating option was invalid");
    }
}

function rngString(stream, rating) {

    addition = 0;

    if(stream == "Up"){
        addition = upstream(rating);
    }
    else if(stream == "Down"){
        addition = downstream(rating);
    }
    else{
        throw("Invalid Streaming option selected");
    }
    generatedString = "You chose to " + stream + "stream" + " with the rating " + rating + ", and you got +" + addition + "\n" + "so the player is now " + (rating + addition) + " rated."; 
    return generatedString;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("stream")
        .setDescription(
            "Generate new rating with Upstream or Downstream",
        )
        .addStringOption((option) =>
            option
            .setName("streamchoice")
            .addChoices({ name: "Upstream", value: "Up" }, { name: "Downstream", value: "Down" })
            .setRequired(true)
            .setDescription("Upstream or Downstream"),
        )
        .addIntegerOption((option) =>
            option
            .setName("rating")
            .setRequired(true)
            .setDescription("The Rating you are streaming"),
        ),
    async execute(interaction) {
        stream = interaction.options.getString("streamchoice");
        rating = interaction.options.getInteger("rating");
        try {
            rngedString = rngString(stream,rating);
        } catch (error) {
            console.error(error);
        }

        return interaction.reply(`${rngedString}`);
    },
};