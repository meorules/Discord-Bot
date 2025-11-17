const {
    SlashCommandBuilder,
    ContextMenuCommandAssertions,
} = require("discord.js");

const fs = require('node:fs');

const PackOpening = require('../modules/packOpening.js');
const CardType = require('../modules/cardType.js');
const Player = require('../modules/Player.js');
const Packs = require('../modules/packs.js');
const Team = require('../modules/team.js')

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
        pack = "Gold Pack(15k)";
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

async function generateString(pack,players, count){
     var generatedString = "";
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

async function packOpen(pack, count) {
    let players = await openPacks(pack, count);
    players.sort(Player.sort);

    return players;
}

function calcPackBalance(pack,count){
    try{
        if(pack == "Gold Upgrade Pack(78+ x2)"){
            return 0;
        }
        else{
            let firstSplit = pack.split("(")[1];
            let secondSplit = firstSplit.split("k)")[0];
            number = parseInt(secondSplit) * 1000 * (count ? count : 1);
            return number;
        }
    }
    catch(err){
        console.error("Unable to find balance: " + err);
    }
}

basePacks = [{ name: "Bronze Pack(2k)", value: "Bronze Pack(2k)" },{ name: "Silver Pack(7.5k)", value: "Silver Pack(7.5k)" },{ name: "Premium Silver Pack(10k)", value: "Premium Silver Pack(10k)" },{ name: "Gold Pack(15k)", value: "Gold Pack(15k)" }, { name: "Premium Gold Pack(25k)", value: "Premium Gold Pack(25k)" }, { name: "Jumbo Premium Gold Pack(40k)", value: "Jumbo Premium Gold Pack(40k)" }, { name: "Gold Upgrade Pack(78+ x2)", value: "Gold Upgrade Pack(78+ x2)" }];
extraPacks = [{ name: "Provisions Pack(35k)", value: "Provisions Pack(35k)" },{ name: "Rare Players Pack(50k)", value: "Rare Players Pack(50k)" },{name:"Elite Hunter Pack(75k)",value: "Elite Hunter Pack(75k)"}]

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pack-open")
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
        )
        .addBooleanOption((option) =>
            option
            .setName("free")
            .setRequired(false)
            .setDescription("If the pack is free, put 1 here, otherwise you can leave it"),
        ),
    async execute(interaction) {
        walkout = null;
        let packName = interaction.options.getString("packname");
        let count = interaction.options.getInteger("count");
        let free = interaction.options.getBoolean("free");

        if (count == null) {
            count = 1;
        }

        let messageString = "This is the pack :eyes:"
        const message = await interaction.channel.send({ content: messageString, fetchReply: true });
        interaction.reply("Rolling odds");

        let username = interaction.user.username;

        let players = [];
        let rngedString = "";
        let packValue = calcPackBalance(packName, count);

        if(free){
            packValue = 0;
        }

        try {
            let currentTeam = await Team.RetrieveTeamByUser(username);
            
            players = await packOpen(packName, count);
            rngedString = await generateString(packName,players,count);
            if(currentTeam){
                if(packValue > currentTeam.mBalance){
                    message.edit("You can't afford this pack!");
                    return;
                }
                if(currentTeam.mAutoAddPlayers==1){
                    let changes = await Team.AddPlayers(currentTeam.mID,players);
                    if(changes != players.length){
                        rngedString = rngedString + "Some players were not added, contact Meo";
                    }
                }
                currentTeam.updateBalance(-packValue);
                if(packValue > 0){
                    rngedString = rngedString + "New Balance after opening pack is "+ currentTeam.mBalance;
                }
            }
            else{
                rngedString = rngedString + "**You do not have a team linked to your account, please create one to auto-add players from these packs.**\n"
            }
            try {
                ownerString = "No Team, " + username;
                balanceString = "No Team, Balance unchanged"
                if(currentTeam){
                    ownerString = currentTeam.mTeamName;
                    balanceString = currentTeam.mBalance;

                    const content = Date() + " - Pack Opened: Team(" + ownerString +  ") Amount(" + packValue + ") Opened by (" + username + ")  - New Balance ("+ balanceString +") \n";
                    fs.appendFileSync('Main/Log/moneyLog.txt', content);

                    const moneyLogChannel = interaction.client.channels.cache.get("1436903358870061212");
                    moneyLogChannel.send("``` ``` \n" + Date() + " - Pack Opened: Team (" + ownerString +  ") Amount (" + packValue + ") Opened by (" + username + ")  - New Balance ("+ balanceString +") \n");
        
                    const playerLogChannel = interaction.client.channels.cache.get("1437279237370548234");
                    let playersgeneratedString = "";
                    for (let i = 0; i < size; i++) {
                        playerString = await players[i].stringify();
                        playersgeneratedString = playersgeneratedString + playerString + "\n";
                    }
                    playersAddedString = " - Players Added:\n"
                    if(currentTeam.mAutoAddPlayers==0){
                        playersAddedString = " - Players Packed but NOT Added:\n"
                    }

                    playerLogChannel.send("``` ``` \n" + Date() + " - **Pack Opened** Team (" + currentTeam.mTeamName  +"), In Channel:" +  interaction.channel.name + playersAddedString + playersgeneratedString);
                }

            // file written successfully
            } catch (err) {
                console.error(err);
            }
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
            walkout = null;
        }


        return;
    },
};