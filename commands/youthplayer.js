const {
    SlashCommandBuilder,
    ContextMenuCommandAssertions,
} = require("discord.js");

tier1Nations = ["Algeria","Cameroon","Cote D'Ivoire","DR Congo","Guadeloupe","Guinea","Martinique","Mali","Morocco","Senegal"];
tier2Nations =  ["Angola", "Benin", "Burkina Faso", "Central African Republic", "Comoros","Congo", "French Guiana", "Gabon", "Guinea-Bissau", "Togo", "Tunisia"];
tier3Nations = ["Argentina", "Cape Verde", "Chad", "Ghana", "Haiti","Italy", "Madagascar", "Mauritania", "Nigeria", "Portugal", "Reunion", "Spain"];

const countryFlags = {
    "Algeria": ":flag_dz:",
    "Cameroon": ":flag_cm:",
    "Cote D'Ivoire": ":flag_ci:",
    "DR Congo": ":flag_cd:",
    "Guadeloupe": ":flag_gp:",
    "Guinea": ":flag_gn:",
    "Martinique": ":flag_mq:",
    "Mali": ":flag_ml:",
    "Morocco": ":flag_ma:",
    "Senegal": ":flag_sn:",
    "Angola": ":flag_ao:",
    "Benin": ":flag_bj:",
    "Burkina Faso": ":flag_bf:",
    "Central African Republic": ":flag_cf:",
    "Comoros": ":flag_km:",
    "Congo": ":flag_cg:",
    "French Guiana": ":flag_gf:",
    "Gabon": ":flag_ga:",
    "Guinea-Bissau": ":flag_gw:",
    "Togo": ":flag_tg:",
    "Tunisia": ":flag_tn:",
    "Argentina": ":flag_ar:",
    "Cape Verde": ":flag_cv:",
    "Chad": ":flag_td:",
    "Ghana": ":flag_gh:",
    "Haiti": ":flag_ht:",
    "Italy": ":flag_it:",
    "Madagascar": ":flag_mg:",
    "Mauritania": ":flag_mr:",
    "Nigeria": ":flag_ng:",
    "Portugal": ":flag_pt:",
    "Reunion": ":flag_re:",
    "Spain": ":flag_es:"
};


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

function generatePosition(position){
    returnedPosition = "";
    switch(position){
        case "Any":
            returnedNumber = generateRandomNumber(0,7);
            switch(returnedNumber){
                case 0:
                    returnedPosition = "GK";
                    break;
                case 1:
                    returnedPosition = "LWB/LB/RB/RWB" ;
                    break;
                case 2:
                    returnedPosition = "CB";
                    break;
                case 3:
                    returnedPosition = "CDM";
                    break;
                case 4:
                    returnedPosition = "CM";
                    break;
                case 5:
                    returnedPosition = "CAM";
                    break;
                case 6: 
                    returnedPosition = "LW/LM/RM/RW";
                    break;
                case 7:
                    returnedPosition = "CF/ST";
                    break;
            }
            break;
        case "GK":
            returnedPosition = "GK";
            break;
        case "Defender":
            returnedNumber = generateRandomNumber(1,2);
            switch(returnedNumber){
                case 1:
                    returnedPosition = "LWB/LB/RB/RWB" ;
                    break;
                case 2:
                    returnedPosition = "CB";
                    break;
            }
            break;
        case "Midfielder":
            returnedNumber = generateRandomNumber(1,4);
            switch(returnedNumber){
                case 1:
                    returnedPosition = "CDM" ;
                    break;
                case 2:
                    returnedPosition = "CM";
                    break;
                case 3:
                    returnedPosition = "CAM" ;
                    break;
                case 4:
                    returnedPosition = "LW/LM/RM/RW";
                    break;
            }
            break;
        case "Forward":
            returnedNumber = generateRandomNumber(1,2);
            switch(returnedNumber){
                case 1:
                    returnedPosition = "LW/LM/RM/RW";
                    break;
                case 2:
                    returnedPosition = "CF/ST";
                    break;
            }
            break;
        
    }
    return returnedPosition;
}

function level5RNG(player){
    rating = 0;
    potential = 0;
    initialRNG = generateRandomNumber(0,10);
    if(initialRNG == 0){
        rating = generateRandomNumber(55,75);
        potential = generateRandomNumber(65,90);
    }
    else if(initialRNG > 0 && initialRNG <= 3){
        rating = generateRandomNumber(55,60);
        potential = generateRandomNumber(65,72);
    }
    else if(initialRNG > 3 && initialRNG <= 6){
        rating = generateRandomNumber(60,65);
        potential = generateRandomNumber(72,77);
    }
    else if(initialRNG == 7){
        rating = generateRandomNumber(65,70);
        potential = generateRandomNumber(77,83);
    }
    else if(initialRNG == 8){
        rating = generateRandomNumber(68,73);
        potential = generateRandomNumber(83,87);
    }
    else if(initialRNG == 9){
        rating = generateRandomNumber(70,75);
        potential = generateRandomNumber(85,90);
    }
    else if(initialRNG == 10){
        rating = generateRandomNumber(74,75);
        potential = generateRandomNumber(88,90);
    }

    player.rating = rating;
    player.potential = potential;
}

function level4RNG(player){
    rating = 0;
    potential = 0;
    initialRNG = generateRandomNumber(0,10);
    if(initialRNG == 0){
        rating = generateRandomNumber(54,74);
        potential = generateRandomNumber(64,88);
    }
    else if(initialRNG > 0 && initialRNG <= 3){
        rating = generateRandomNumber(54,59);
        potential = generateRandomNumber(63,70);
    }
    else if(initialRNG > 3 && initialRNG <= 6){
        rating = generateRandomNumber(59,64);
        potential = generateRandomNumber(70,75);
    }
    else if(initialRNG == 7){
        rating = generateRandomNumber(64,69);
        potential = generateRandomNumber(75,81);
    }
    else if(initialRNG == 8){
        rating = generateRandomNumber(67,72);
        potential = generateRandomNumber(81,85);
    }
    else if(initialRNG == 9){
        rating = generateRandomNumber(69,74);
        potential = generateRandomNumber(83,88);
    }
    else if(initialRNG == 10){
        rating = generateRandomNumber(73,74);
        potential = generateRandomNumber(86,88);
    }

    player.rating = rating;
    player.potential = potential;
}

function level3RNG(player){
    rating = 0;
    potential = 0;
    initialRNG = generateRandomNumber(0,10);
    if(initialRNG == 0){
        rating = generateRandomNumber(53,73);
        potential = generateRandomNumber(63,87);
    }
    else if(initialRNG > 0 && initialRNG <= 3){
        rating = generateRandomNumber(53,58);
        potential = generateRandomNumber(62,69);
    }
    else if(initialRNG > 3 && initialRNG <= 6){
        rating = generateRandomNumber(58,63);
        potential = generateRandomNumber(69,74);
    }
    else if(initialRNG == 7){
        rating = generateRandomNumber(63,68);
        potential = generateRandomNumber(74,80);
    }
    else if(initialRNG == 8){
        rating = generateRandomNumber(66,71);
        potential = generateRandomNumber(80,84);
    }
    else if(initialRNG == 9){
        rating = generateRandomNumber(68,73);
        potential = generateRandomNumber(82,87);
    }
    else if(initialRNG == 10){
        rating = generateRandomNumber(72,73);
        potential = generateRandomNumber(85,87);
    }

    player.rating = rating;
    player.potential = potential;
}

function level2RNG(player){
    rating = 0;
    potential = 0;
    initialRNG = generateRandomNumber(0,10);
    if(initialRNG == 0){
        rating = generateRandomNumber(51,71);
        potential = generateRandomNumber(61,85);
    }
    else if(initialRNG > 0 && initialRNG <= 3){
        rating = generateRandomNumber(51,56);
        potential = generateRandomNumber(60,67);
    }
    else if(initialRNG > 3 && initialRNG <= 6){
        rating = generateRandomNumber(56,61);
        potential = generateRandomNumber(67,72);
    }
    else if(initialRNG == 7){
        rating = generateRandomNumber(61,66);
        potential = generateRandomNumber(72,78);
    }
    else if(initialRNG == 8){
        rating = generateRandomNumber(64,69);
        potential = generateRandomNumber(78,82);
    }
    else if(initialRNG == 9){
        rating = generateRandomNumber(66,71);
        potential = generateRandomNumber(80,85);
    }
    else if(initialRNG == 10){
        rating = generateRandomNumber(70,71);
        potential = generateRandomNumber(83,85);
    }

    player.rating = rating;
    player.potential = potential;
}

function level1RNG(player){
    rating = 0;
    potential = 0;
    initialRNG = generateRandomNumber(0,10);
    if(initialRNG == 0){
        rating = generateRandomNumber(50,70);
        potential = generateRandomNumber(59,83);
    }
    else if(initialRNG > 0 && initialRNG <= 3){
        rating = generateRandomNumber(50,54);
        potential = generateRandomNumber(58,65);
    }
    else if(initialRNG > 3 && initialRNG <= 6){
        rating = generateRandomNumber(54,59);
        potential = generateRandomNumber(65,70);
    }
    else if(initialRNG == 7){
        rating = generateRandomNumber(59,64);
        potential = generateRandomNumber(70,76);
    }
    else if(initialRNG == 8){
        rating = generateRandomNumber(62,67);
        potential = generateRandomNumber(76,80);
    }
    else if(initialRNG == 9){
        rating = generateRandomNumber(64,69);
        potential = generateRandomNumber(78,83);
    }
    else if(initialRNG == 10){
        rating = generateRandomNumber(69,70);
        potential = generateRandomNumber(81,83);
    }

    player.rating = rating;
    player.potential = potential;
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
            nation = generateRandomNumber(0,tier1Nations.length-1);
            player.secondnation = tier1Nations[nation];
        }
        else if(tierChance > 60 && tierChance <= 90){
            nation = generateRandomNumber(0,tier2Nations.length-1);
            player.secondnation = tier2Nations[nation];
        }
        else if(tierChance > 90 && tierChance <=100){
            nation = generateRandomNumber(0,tier3Nations.length-1);
            player.secondnation = tier3Nations[nation];
        }
        else{
            throw("Some error occured randomizing SN");
        }

    }
}

function rngPlayer(player){
    if(player.rating == 0 || player.potential == 0){
        throw("Error calculating rating");
    }
    else{
        growth = player.potential - player.rating;
        if(growth <= 0){
            player.potential = player.rating + 3;
            growth = player.potential - player.rating;
        }

        if(growth >=3 && growth <=5){
            age = generateRandomNumber(21,23);
        }
        else if(growth >=6 && growth <=8){
            age = generateRandomNumber(19,21);
        }
        else if(growth >=9 && growth <=11){
            age = generateRandomNumber(18,19);
        }
        else if(growth >=12 && growth <=15){
            age = generateRandomNumber(17,18);
        }
        else if(growth >=16){
            age = generateRandomNumber(16,17);
        }
    }

    player.age = age;
    traitRNG = 0;
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

    versatilePlayer(player);
    snPlayer(player);
}

function generatePlayer(position,level){
    positionReturned = generatePosition(position);
    player = {position:"", rating:0, potential:0,trait:"",age:0,secondnation:""};
    player.position = positionReturned;
    switch(level){
        case "Basic":
            level1RNG(player);
            break;
        case "Decent":
            level2RNG(player);
            break;
        case "Good":
            level3RNG(player);
            break;
        case "Great":
            level4RNG(player);
            break;
        case "Elite":
            level5RNG(player);
            break;
    }
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

function stringify(player){
    if(player.rating >= 70 || (player.rating >=66 && player.potential >=81)){
        string = "**"  +player.rating + "/" + player.potential + "**";
    }
    else{
        string = player.rating + "/" + player.potential;
    }
    string = string + " **" + player.position + "** PlayerName " + player.age + " :flag_fr: *" + player.trait + "*";

    if(player.secondnation == "Your Choice :)"){
        string = string + " You get to choose the nation :)";
    }
    else if(player.secondnation != ""){
        string = string + " " + player.secondnation + " " + countryFlags[player.secondnation];
    }

    return string;
}

function getLevelString(level){
    switch(level){
        case "Basic":
            return ":star:"
            break;
        case "Decent":
            return ":star::star:"
            break;
        case "Good":
            return ":star::star::star:"
            break;
        case "Great":
            return ":star::star::star::star:"
            break;
        case "Elite":
            return ":star::star::star::star::star:"
            break;
    }
}

function rngString(count, position, level) {

    players = generatePlayers(count,position,level);
    size = players.length;
    if (count == 1){
        generatedString = "A youth player with the position " + position + " was rnged. Academy Level: " + getLevelString(level) + "\n";
        generatedString= generatedString + "They are: " + stringify(players[0]);
    }
    else if (count > 1){
        generatedString = "The following youth players were generated at academy Level: " +  getLevelString(level) + "\n"
        for (let i = 0; i < size; i++) {
            generatedString = generatedString + i+1 + ". " + stringify(players[i]) + "\n";
        }
    }
    return generatedString;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("youthgen")
        .setDescription(
            "Generate Youth Players",
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

        if (position == null) {
            position = "Any";
        }
        else{
            count = 1;
        }
        try {
            rngedString = rngString(count, position,level);
        } catch (error) {
            console.error(error);
        }

        return interaction.reply(`${rngedString}`);
    },
};