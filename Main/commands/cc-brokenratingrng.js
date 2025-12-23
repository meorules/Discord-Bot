const {
    SlashCommandBuilder,
    ContextMenuCommandAssertions,
} = require("discord.js");

const PackOpening = require('../modules/packOpening.js');
const CardType = require('../modules/cardType.js');
const Player = require('../modules/Player.js');
const Team = require('../modules/team.js')

interactingUser = null;

async function packOpenString(rating, count,interaction) {

    let packedPlayer = [];
    let player;
    let validPlayerCount = 0;

    for (let j = 0; j < count; j++) {
        if (rating > 46 && rating <= 91) {
            player = await PackOpening.GenerateRandomPlayerByRatingBroken(rating);
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

    }

    let currentTeam = await Team.RetrieveTeamByUser(interactingUser);
    if(currentTeam){
        if(currentTeam.mAutoAddPlayers==1){
            await Team.AddPlayers(currentTeam.mID,packedPlayer);
            try{
                const playerLogChannel = interaction.client.channels.cache.get("1437279237370548234");
                let playersgeneratedString = "";
                for (let j = 0; j < packedPlayer.length; j++) {
                    playerString = await packedPlayer[j].stringify();
                    playersgeneratedString = playersgeneratedString + playerString + "\n";
                }
                playerLogChannel.send("``` ``` \n" + Date() + " - **Rating RNG Pack** Team (" + currentTeam.mTeamName +  "), In Channel: " +  interaction.channel.name + " -  Player(s) Added:\n"+ playersgeneratedString);
            }
            catch(err){
                console.error(err);
            }
        }
    }
    else{
        generatedString = generatedString + "**You do not have a team linked to your account, please create one to auto-add players from these packs.**\n"
    }


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
        .setName("broken-rating-rng")
        .setDescription(
            "Roll a random player based on their rating, do not use this command without mod approval",
        )
        .addIntegerOption((option) =>
            option
            .setName("rating")
            .setRequired(false)
            .setDescription("The rating you want to rng, put -1 for non-elite special, -2 for random elite"),
        )
        .addIntegerOption((option) =>
            option
            .setName("count")
            .setRequired(false)
            .setDescription("The number of players you want to from each pack"),
        ),
    async execute(interaction) {
        interactingUser = interaction.user.username;
        let rating = interaction.options.getInteger("rating") || null;
        let count = interaction.options.getInteger("count");

        if (count == null) {
            count = 1;
        }

        if (rating == null) {
            interaction.followUp(`Please supply a rating`);
            return;
        }

        try {
            rngedString = await packOpenString(rating, count,interaction);
        } catch (error) {
            console.error(error);
        }

        //console.log(rngedString);
        interactingUser = null;
        interaction.followUp(`${rngedString}`);
        rngedString = "";
        return;
    },
};