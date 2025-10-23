const {
    SlashCommandBuilder,
    ContextMenuCommandAssertions,
} = require("discord.js");

const playerArrays = require('../countrycodes.js')

countryCodes = playerArrays.countryCodes;
countryFlags = playerArrays.countryFlags;
tier1Nations = playerArrays.tier1Nations;
tier2Nations = playerArrays.tier2Nations;
tier3Nations = playerArrays.tier3Nations;


function generateRandomNumber(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored + 1 - minCeiled) + minCeiled);
}

function getCountryAPI(player){
    switch (player.secondnation) {
        case "Algeria":
            return countryCodes["Arabic"];
        case "Cameroon":
            return countryCodes["African"];
        case "Cote D'Ivoire":
            return countryCodes["Akan"];
        case "DR Congo":
            return countryCodes["Kongo"];
        case "Guadeloupe":
            return countryCodes["Mayan"];
        case "Guinea":
            return countryCodes["African"];
        case "Martinique":
            return countryCodes["Mayan"];
        case "Mali":
            return countryCodes["African"];
        case "Morocco":
            return countryCodes["Arabic"];
        case "Senegal":
            return countryCodes["African"];
        case "Angola":
            return countryCodes["Mbundu"];
        case "Benin":
            return countryCodes["African"];
        case "Burkina Faso":
            return countryCodes["African"];
        case "Central African Republic":
            return countryCodes["African"];
        case "Comoros":
            return countryCodes["Comorian"];
        case "Congo":
            return countryCodes["Kongo"];
        case "French Guiana":
            return countryCodes["African"];
        case "Gabon":
            return countryCodes["African"];
        case "Guinea-Bissau":
            return countryCodes["African"];
        case "Togo":
            return countryCodes["Ewe"];
        case "Tunisia":
            return countryCodes["Arabic"];
        case "Argentina":
            return countryCodes["Spanish"];
        case "Cape Verde":
            return countryCodes["Portuguese"];
        case "Chad":
            return countryCodes["African"];
        case "Ghana":
            return countryCodes["Ga"];
        case "Haiti":
            return countryCodes["Mayan"];
        case "Italy":
            return countryCodes["Italian"];
        case "Madagascar":
            return countryCodes["African"];
        case "Mauritania":
            return countryCodes["Arabic"];
        case "Nigeria":
            return countryCodes["Igbo"];
        case "Portugal":
            return countryCodes["Portuguese"];
        case "Reunion":
            return countryCodes["African"];
        case "Spain":
            return countryCodes["Spanish"];
        default:
            throw("Error identifying API Call for 2nd nation");
    }
}

async function generatePlayerName(player){

    baseURL = 'https://www.behindthename.com/api/random.json?usage_fre=1&gender=m&randomsurname=yes&key=ma536057346';

    if(player.secondnation == "Your Choice :)"){
        baseURL = baseURL;
    }
    else if(player.secondnation != "" && player.secondnation != null){
        baseURL = baseURL + "&usage_" + getCountryAPI(player) + "=1";
    }

    combinedName = "";
    await fetch(baseURL)
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        combinedName = data.names[0] + " " +data.names[2];
        player.playerName = combinedName;
    })
    .catch(error => {
        console.error('Error:', error);
    });
    return combinedName;

}

function versatilePlayer(player){
    chance = generateRandomNumber(1,10);
    if(chance == 1 && player.position != "GK"){
    player.trait = player.trait + ", Versatile ";
            switch(player.position){
                case "GK":
                    //Sad state for you, he's versatile, so he should have a different trait and this should be impossible to get to
                    //throw("Somehow, a GK was rnged but got versatile, please contact meo");
                    //Do nothing
                    break;
                case "LWB/LB/RB/RWB":
                    rng = generateRandomNumber(1,3);
                    if(rng == 1){
                        player.trait = player.trait + "Complete Defender";
                        player.position = "CDM/WB/FB/CB";
                    }
                    else if(rng == 2){
                        player.trait = player.trait + "Wideman";
                        player.position = "FB/WB/WM/W";
                    }
                    else if(rng == 3){
                        player.trait = player.trait + "Box-To-Box";
                        player.position = "CM/CDM/WB/FB";
                    }
                    break;
                case "CB":
                    rng = generateRandomNumber(1,2);
                    if(rng == 1){
                        player.trait = player.trait + "Complete Defender";
                        player.position = "CDM/WB/FB/CB";
                    }
                    else if(rng == 2){
                        player.trait = player.trait + "Deep-lying Playmaker";
                        player.position = "CM/CDM/CB";
                    }
                    break;
                case "CDM":
                    rng = generateRandomNumber(1,4);
                    if(rng == 1){
                        player.trait = player.trait + "Complete Defender";
                        player.position = "CDM/WB/FB/CB";
                    }
                    else if(rng == 2){
                        player.trait = player.trait + "Complete Midfielder";
                        player.position = "CDM/CM/CAM/WM";
                    }
                    else if(rng == 3){
                        player.trait = player.trait + "Box-To-Box";
                        player.position = "CM/CDM/WB/FB";
                    }
                    else if(rng == 4){
                        player.trait = player.trait + "Deep-lying Playmaker";
                        player.position = "CM/CDM/CB";
                    }
                    break;                    break;
                case "CM":
                    rng = generateRandomNumber(1,3);
                    if(rng == 1){
                        player.trait = player.trait + "Complete Midfielder";
                        player.position = "CDM/CM/CAM/WM";
                    }
                    else if(rng == 2){
                        player.trait = player.trait + "Box-To-Box";
                        player.position = "CM/CDM/WB/FB";
                    }
                    else if(rng == 3){
                        player.trait = player.trait + "Deep-lying Playmaker";
                        player.position = "CM/CDM/CB";
                    }
                    break;
                case "CAM":
                    rng = generateRandomNumber(1,2);
                    if(rng == 1){
                        player.trait = player.trait + "Complete Attacker";
                        player.position = "CAM/W/CF/ST";
                    }
                    else if(rng == 2){
                        player.trait = player.trait + "Complete Midfielder";
                        player.position = "CDM/CM/CAM/WM";
                    }
                    break;
                case "LW/LM/RM/RW": 
                    rng = generateRandomNumber(1,3);
                    if(rng == 1){
                        player.trait = player.trait + "Complete Midfielder";
                        player.position = "CDM/CM/CAM/WM";
                    }
                    else if(rng == 2){
                        player.trait = player.trait + "Complete Attacker";
                        player.position = "CAM/W/CF/ST";
                    }
                    else if(rng == 3){
                        player.trait = player.trait + "Wideman";
                        player.position = "FB/WB/WM/W";
                    }
                    break;
                case "CF/ST":
                    player.trait = player.trait + "Complete Attacker";
                    player.position = "CAM/W/CF/ST";
                    break;
            }
        }
}

function snPlayer(player){
    chance = generateRandomNumber(1,10);
    if(chance <= 6){
        tierChance = generateRandomNumber(1,100);
        if(tierChance <= 5){
            player.secondnation = "Your Choice :)";
        }
        else if(tierChance > 5 && tierChance <= 60){
            nation = generateRandomNumber(0,tier1Nations.length);
            player.secondnation = tier1Nations[nation];
        }
        else if(tierChance > 60 && tierChance <= 90){
            nation = generateRandomNumber(0,tier2Nations.length);
            player.secondnation = tier2Nations[nation];
        }
        else if(tierChance > 90 && tierChance <=100){
            nation = generateRandomNumber(0,tier3Nations.length);
            player.secondnation = tier3Nations[nation];
        }
        else{
            throw("Some error occured randomizing SN");
        }

    }
}

function rngPlayer(player){
    if(player.position=="GK"){
        traitRNG = generateRandomNumber(1,7);
    }
    else{
        traitRNG = generateRandomNumber(1,7);
    }
    switch(traitRNG){
        case 1:
            player.trait = "Quick Learner";
            break;
        case 2:
            player.trait = "Consistent";
            break;
        case 3:
            player.trait = "Leadership";
            break;
        case 4:
            player.trait = "Teacher's Pet";
            break;
        case 5:
            player.trait = "Early Bloomer";
            break;
        case 6:
            player.trait = "Fan Favourite";
            break;
        case 7:
            player.trait = "Manager's Favourite";
            break;
    }
    snPlayer(player);
}

async function stringify(player){

    playerName = "PlayerName";
    playerName = await generatePlayerName(player);

    string = playerName + " :flag_fr: *" + player.trait + "*";

    if(player.secondnation == "Your Choice :)"){
        string = string + " You get to choose the nation :)";
    }
    else if(player.secondnation != "" && player.secondnation != null){
        string = string + " " + player.secondnation + " " + countryFlags[player.secondnation];
    }

    return string;
}


function generatePlayer(position,level){
    player = {position:"", rating:0, potential:0,trait:"",age:0,secondnation:"",playerName:""};
    rngPlayer(player);
    return player;
}

function generatePlayers(count,position,level){
    players = [];
    if(position == "Any"){
        for(let i=0;i<count;i++){
            players[i] = generatePlayer("Any",level);
        }
    }
    else{
        players[0] = generatePlayer(position,level);
    }
    return players;
}



async function rngString(count, position, level) {

    players = generatePlayers(count,position,level);
    generatedString = "";
    
    size = players.length;
    if (count == 1){
        generatedString = generatedString + "They are: " + await stringify(players[0]);
    }
    else if (count > 1){
        for (let i = 0; i < size; i++) {
            generatedString = generatedString + i+1 + ". " + await stringify(players[i]) + "\n";
        }
    }
    return generatedString;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("youthsecondnation")
        .setDescription(
            "Generate Second Nations for previous Youth Players",
        )
        .addStringOption((option) =>
            option
            .setName("youthlevel")
            .setRequired(true)
            .addChoices({ name: "1 Star", value: "Basic" }, { name: "2 Stars", value: "Decent" }, { name: "3 Stars", value: "Good" }, { name: "4 Stars", value: "Great" }, { name: "5 Stars", value: "Elite" })
            .setDescription("The youth level of your academy"),
        )
        .addStringOption((option) =>
            option
            .setName("position")
            .setRequired(false)
            .addChoices({ name: "GK", value: "GK" }, { name: "Defender", value: "Defender" }, { name: "Midfielder", value: "Midfielder" }, { name: "Forward", value: "Forward" })
            .setDescription("An optional parameter for position"),
        )
        .addIntegerOption((option) =>
            option
            .setName("count")
            .setRequired(false)
            .setDescription("The number of players to generate"),
        ),
    async execute(interaction) {
        level = interaction.options.getString("youthlevel");
        position = interaction.options.getString("position");
        count = interaction.options.getInteger("count");
        if(count == null){
            count = 1;
        }

        messageString = "Potential Youth Players :eyes:"
        const message = await interaction.channel.send({ content: messageString, fetchReply: true });
        interaction.reply("Generating Youth Players");

        if (position == null) {
            position = "Any";
        }
        else{
            count = 1;
        }
        try {
            rngedString = await rngString(count, position,level);
        } catch (error) {
            console.error(error);
        }

        message.edit(rngedString);

        return;
    },
};