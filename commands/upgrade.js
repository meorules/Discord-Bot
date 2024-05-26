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


function upgradePlayer(player){
    if(player.tracker != ""){
        player.tracker = player.tracker + ", and then ";
    }
    age = player.newage;
    rating = player.newrating;
    if(age <= 23){
        if(rating <= 69){
            player.newrating = rating + 5;
            player.tracker = player.tracker + "+5";
        }
        else if(rating > 69 && rating <= 75){
            player.newrating = rating + 3;
            player.tracker = player.tracker + "+3";
        }
        else if(rating > 75 && rating <= 82){
            player.newrating = rating + 2;
            player.tracker = player.tracker + "+2";
        }
        else if(rating > 82){
            player.newrating = rating + 1;
            player.tracker = player.tracker + "+1";
        }
    }
    else if(age > 23 && age <= 28 ){
        if(rating <= 75){
            player.newrating = rating + 3;
            player.tracker = player.tracker + "+3 or reached potential";
        }
        else if(rating > 75 && rating <= 82){
            player.newrating = rating + 2;
            player.tracker = player.tracker + "+2 or reached potential";
        }
        else if(rating >= 83){
            player.newrating = rating + 1;
            player.tracker = player.tracker + "+1 or reached potential";
        }
    }
    else if(age > 28 && age <= 31){
        player.tracker = player.tracker + "Reached potential";
    }
    else if(age >= 32){
         if(age >=38){
            player.tracker = "Retired";
         }
         else if(age == 37){
            player.newrating = rating - 5;
            player.tracker = player.tracker + "-5";
         }
         else if(age == 36 || age == 35){
            player.newrating = rating - 3;
            player.tracker = player.tracker + "-3";
         }
         else if(age == 34 || age == 33 || age == 32){
            player.newrating = rating - 2;
            player.tracker = player.tracker + "-2";
         }
    }
    player.newage   = age + 1;
    player.seasons   = seasons + 1;
}

function generateString(player) {
    generatedString = "";

    if (player.tracker != "Retired"){
        generatedString = "The provided player started at rating " + player.oldrating + " and age " + player.oldage + ", and after " + (player.seasons-1) + " seasons, the player is now " + player.newrating + " and also " + player.newage + " years old. The player went through " + player.tracker;
    }
    else {
        generatedString = "The provided player started at rating " + player.oldrating + " and age " + player.oldage + ", and after " + (player.seasons-1) + " seasons, the player is now retired."; 
    }

    return generatedString;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("outsiderupgrade")
        .setDescription(
            "Provides upgrades to outsiders based on starting rating and age",
        )
        .addIntegerOption((option) =>
            option
            .setName("rating")
            .setRequired(true)
            .setDescription("The rating of the player on sofifa"),
        )
        .addIntegerOption((option) =>
            option
            .setName("age")
            .setRequired(true)
            .setDescription("The age of the player at the start of the fl"),
        )
        .addIntegerOption((option) =>
            option
            .setName("count")
            .setRequired(false)
            .setDescription("The number of seasons which have passed, starts at 1"),
        ),
    async execute(interaction) {
        rating = interaction.options.getInteger("rating");
        age = interaction.options.getInteger("age");
        seasons = interaction.options.getInteger("count");
        if (seasons == null) {
            seasons = 1;
        }

        try {
            player = {oldrating:rating,oldage:age,newrating:rating,newage:age,seasons:1,tracker:""};
            for(let i =0 ;i<seasons;i++){
                upgradePlayer(player);
            }
            string = generateString(player);
        } catch (error) {
            console.error(error);
        }

        return interaction.reply(`${string}`);
    },
};