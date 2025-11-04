const {
    SlashCommandBuilder,
    ContextMenuCommandAssertions,
} = require("discord.js");

const PackOpening = require('../modules/packOpening.js');
const CardType = require('../modules/cardType.js');
const Player = require('../modules/Player.js');
const Packs = require('../modules/packs.js');


async function openPack(packName) {
    let players = []

    switch (packName) {
        case "Elite Hunter Pack(75k)":
            players = await Packs.openEliteHunterPack(8);
            break;
        case "Rare Players Pack(50k)":
            players = await Packs.openRarePlayersPack(6);
            break;
        case "Rarer Players Pack(60k)":
            players = await Packs.openRarerPlayersPack(6);
            break;
        case "Gold Pack(15k)":
            players = await Packs.openGoldPack(3);
            break;
        case "Premium Gold Pack(25k)":
            players = await Packs.openPremiumGoldPack(3);
            break;
        case "Jumbo Premium Gold Pack(40k)":
            players = await Packs.openJumboPremiumGoldPack(5);
            break;
        case "Gold Upgrade Pack(78+ x2)":
            players = await Packs.openGoldUpgradePack(2);
            break;
        case "Bronze Pack(2k)":
            players = await Packs.openBronzePack(3);
            break;
        case "Silver Pack(7.5k)":
            players = await Packs.openSilverPack(3);
            break;
        case "Premium Silver Pack(10k)":
            players = await Packs.openPremiumSilverPack(3);
            break;
        default:
            throw new Error('Invalid or unadded pack selected');
            break;
    }
    return players;
}


async function openPacks(pack, count) {
    packPlayers = [];
    //console.log("In the function now");


    if (pack == "Provisions Pack(35k)") {
        pack = "Gold Pack(10k)";
        count = count * 5;
    }

    if (count == 1) {
        packPlayers = await openPack(pack);
        //console.log(packPlayers);
    } else {
        for (let i = 0; i < count; i++) {
            individualPackPlayers = await openPack(pack);
            //console.log(individualPackPlayers);
            packPlayers = packPlayers.concat(individualPackPlayers);
        }
    }
    return packPlayers;
}

async function packOpenString(pack, count) {
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
        .setName("openpack")
        .setDescription(
            "Open a Pack",
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
            .setDescription("The number of packs you want to open"),
        ),
    async execute(interaction) {
        let packName = interaction.options.getString("packname");
        let count = interaction.options.getInteger("count");

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
                // if(generatedString > 3){
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