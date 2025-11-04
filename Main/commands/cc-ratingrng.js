const {
    SlashCommandBuilder,
    ContextMenuCommandAssertions,
} = require("discord.js");

const PackOpening = require('../modules/packOpening.js');
const CardType = require('../modules/cardType.js');
const Player = require('../modules/Player.js');

async function packOpenString(rating, count) {

    let packedPlayer = [];
    let player;
    let validPlayerCount = 0;

    for (let j = 0; j < count; j++) {
        if (rating > 46 && rating <= 91) {
            player = await PackOpening.GenerateRandomPlayerByRating(rating);
            if (count == 1) {
                generatedString = "You opened a 1x " + rating + " pack and got these players: \n";
            } else {
                generatedString = "You opened " + count + " of the " + rating + " player pack and got these players: \n";
            }
        } else if (rating == -1) {
            player = await PackOpening.GenerateNonEliteSpecial();
            if (count == 1)  {
                generatedString = "You opened a 1x Non-Elite Special pack and got these players: \n";
            } else {
                generatedString = "You opened " + count + " of the Non-Elite Special player pack and got these players: \n";
            }
        } else if (rating == -2) {
            player = await PackOpening.GenerateElite();
            if (count == 1) {
                generatedString = "You opened a 1x Elite pack and got these players: \n";
            } else {
                generatedString = "You opened " + count + " of the Elite player pack and got these players: \n";
            }
        }
        else if(rating > 0 && rating < 47){
            player = await PackOpening.GenerateRandomPlayerByCardType(rating);
            cardType = await CardType.RetrieveCardTypeByID(rating);
            if (count == 1) {
                generatedString = "You opened a 1x " +  cardType.stringify() + " pack and got these players: \n";
            } else {
                generatedString = "You opened " + count + " of the " +  cardType.stringify() + " player pack and got these players: \n";
            }
        }

        if(j == 0 && player == null){
            generatedString = generatedString + "The provided card type ID does not exist or there are no players for it."
        }
        else if(player!=null){
            packedPlayer.push(player);
            validPlayerCount++;
        }
        //console.log("players array")
        //console.log(players)
    }

    //console.log("players array")
    //console.log(players)

    size = packedPlayer.length;

    if(validPlayerCount != count){
        generatedString = generatedString + "There were " + (count-size) + " players which were not generated correctly. \n";
    }


    for (let i = 0; i < size; i++) {
        playerString = await packedPlayer[i].stringify();
        generatedString = generatedString + playerString + "\n";
    }

    return generatedString;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ratingrng")
        .setDescription(
            "Roll a random player from the database based on their rating",
        )
        .addIntegerOption((option) =>
            option
            .setName("rating")
            .setRequired(true)
            .setDescription("The rating you want to rng, put -1 for non-elite special, -2 for random elite"),
        )
        .addIntegerOption((option) =>
            option
            .setName("count")
            .setRequired(false)
            .setDescription("The number of players you want to from each pack"),
        ),
    async execute(interaction) {
        let rating = interaction.options.getInteger("rating");
        let count = interaction.options.getInteger("count");

        if (count == null) {
            count = 1;
        }

        try {
            rngedString = await packOpenString(rating, count);
        } catch (error) {
            console.error(error);
        }

        //console.log(rngedString);

        return interaction.reply(`${rngedString}`);
    },
};