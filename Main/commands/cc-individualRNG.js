const {
    SlashCommandBuilder,
    ContextMenuCommandAssertions,
} = require("discord.js");

walkout = null;

const PackOpening = require('../modules/packOpening.js');
const CardType = require('../modules/cardType.js');
const Player = require('../modules/Player.js');
const Packs = require('../modules/packs.js');


async function openPack(packName) {
    let players = []

    switch (packName) {
        case "Elite Hunter Pack(75k)":
            players = await Packs.openEliteHunterPack(1);
            break;
        case "Rare Players Pack(50k)":
            players = await Packs.openRarePlayersPack(1);
            break;
        case "Rarer Players Pack(60k)":
            players = await Packs.openRarerPlayersPack(1);
            break;
        case "Gold Pack(15k)":
            players = await Packs.openGoldPack(1);
            break;
        case "Premium Gold Pack(25k)":
            players = await Packs.openPremiumGoldPack(1);
            break;
        case "Jumbo Premium Gold Pack(40k)":
            players = await Packs.openJumboPremiumGoldPack(1);
            break;
        case "Gold Upgrade Pack(78+ x2)":
            players = await Packs.openGoldUpgradePack(1);
            break;
        case "Bronze Pack(2k)":
            players = await Packs.openBronzePack(1);
            break;
        case "Silver Pack(7.5k)":
            players = await Packs.openSilverPack(1);
            break;
        case "Premium Silver Pack(10k)":
            players = await Packs.openPremiumSilverPack(1);
            break;
        default:
            throw new Error('Invalid or unadded pack selected');
            break;
    }
    return players;
}

async function openPacks(pack, count) {
    packPlayers = [];

    if (pack == "Provisions Pack(35k)") {
        pack = "Gold Pack(10k)";
        count = count;
    }

    if (count == 1) {
        packPlayers = await openPack(pack);
    } else {
        for (let i = 0; i < count; i++) {
            individualPackPlayers = await openPack(pack);
            packPlayers = packPlayers.concat(individualPackPlayers);
        }
    }
    return packPlayers;
}

async function packOpenString(pack, count) {
    walkout = null;
    let players = await openPacks(pack, count);
    players.sort(Player.sort);

    size = players.length;
    if (count == 1) {
        generatedString = "You opened a " + pack + " and got these players: \n";
    } else {
        generatedString = "You opened " + count + " of the " + pack + " and got these players: \n";
    }

    for (let i = 0; i < size; i++) {
        if(i==0 && players[i].isWalkout()){
            playerString = "?????????????";
            walkout = players[i];
        }else{
            playerString = await players[i].stringify();
        }
        generatedString = generatedString + playerString + "\n";
    }

    return generatedString;
}

basePacks = [{ name: "Bronze Pack(2k)", value: "Bronze Pack(2k)" },{ name: "Silver Pack(7.5k)", value: "Silver Pack(7.5k)" },{ name: "Premium Silver Pack(10k)", value: "Premium Silver Pack(10k)" },{ name: "Gold Pack(15k)", value: "Gold Pack(15k)" }, { name: "Premium Gold Pack(25k)", value: "Premium Gold Pack(25k)" }, { name: "Jumbo Premium Gold Pack(40k)", value: "Jumbo Premium Gold Pack(40k)" }, { name: "Gold Upgrade Pack(78+ x2)", value: "Gold Upgrade Pack(78+ x2)" }];
extraPacks = [{ name: "Provisions Pack(35k)", value: "Provisions Pack(35k)" },{ name: "Rare Players Pack(50k)", value: "Rare Players Pack(50k)" },{name:"Elite Hunter Pack(75k)",value: "Elite Hunter Pack(75k)"}]

module.exports = {
    data: new SlashCommandBuilder()
        .setName("dupereroll")
        .setDescription(
            "Open any of the packs for dupe replacement",
        )
        .addStringOption((option) =>
            option
            .setName("packname")
            .setRequired(true)
            .addChoices(basePacks)
            .setDescription("The pack you want to open"),
        )
        .addIntegerOption((option) =>
            option
            .setName("count")
            .setRequired(false)
            .setDescription("The number of players you want to from each pack"),
        ),
    async execute(interaction) {
        packName = interaction.options.getString("packname");
        count = interaction.options.getInteger("count");

        if (count == null) {
            count = 1;
        }

        messageString = "This is the pack :eyes:"
        const message = await interaction.channel.send({ content: messageString, fetchReply: true });
        interaction.reply("Rolling odds");

        try {
            rngedString = await packOpenString(packName, count);
        } catch (error) {
            console.error(error);
        }

        pauseTime = 1000;

        message.edit(rngedString);
        let eliteMessageString = "# You packed a \n";
        if(walkout){
            const eliteMessage = await interaction.channel.send({ content:eliteMessageString, fetchReply: true });
            await new Promise(r => setTimeout(r, pauseTime));

            let generatedStrings = await walkout.returnWalkoutStrings();
            let hashString = "# "
            for(generatedString in generatedStrings){
                // if(generatedString > 3 && generatedString < 6){
                //     hashString = "## "
                // }
                eliteMessageString = eliteMessageString + hashString + generatedStrings[generatedString];

                eliteMessage.edit(eliteMessageString);
                await new Promise(r => setTimeout(r, pauseTime));
            }

        }

        return;
    },
};