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

function rngPlayer(player){
    rating = 0;
    potential = 0;
    initialRNG = generateRandomNumber(0,10);
    if(initialRNG == 0){
        rating = generateRandomNumber(50,70);
        potential = generateRandomNumber(65,86);
    }
    else if(initialRNG > 0 && initialRNG <= 3){
        rating = generateRandomNumber(50,55);
        potential = generateRandomNumber(65,70);
    }
    else if(initialRNG > 3 && initialRNG <= 6){
        rating = generateRandomNumber(55,60);
        potential = generateRandomNumber(70,74);
    }
    else if(initialRNG == 7){
        rating = generateRandomNumber(60,63);
        potential = generateRandomNumber(74,77);
    }
    else if(initialRNG == 8){
        rating = generateRandomNumber(63,67);
        potential = generateRandomNumber(77,82);
    }
    else if(initialRNG == 9){
        rating = generateRandomNumber(65,70);
        potential = generateRandomNumber(80,85);
    }
    else if(initialRNG == 10){
        rating = generateRandomNumber(70,72);
        potential = generateRandomNumber(82,86);
    }

    if(rating == 0 || potential == 0){
        throw("Error calculating rating");
    }
    else{
        growth = potential - rating;
        if(growth == 0){
            rating = rating + 3;
        }
        if(growth >=3 && growth <=5){
            age = generateRandomNumber(21,23);
        }
        if(growth >=6 && growth <=8){
            age = generateRandomNumber(19,21);
        }
        if(growth >=9 && growth <=11){
            age = generateRandomNumber(18,19);
        }
        if(growth >=12 && growth <=15){
            age = generateRandomNumber(17,18);
        }
        if(growth >=16){
            age = generateRandomNumber(16,17);
        }
    }

    player.age = age;
    player.rating = rating;
    player.potential = potential;
    traitRNG = 0;
    if(player.position=="GK"){
        traitRNG = generateRandomNumber(1,5);
    }
    else{
        traitRNG = generateRandomNumber(1,6);
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
            player.trait = "Second Nation";
            break;
        case 6:
            player.trait = "Versatile ";
            switch(player.position){
                case "GK":
                    //Sad state for you, he's versatile, so he should have a different trait and this should be impossible to get to
                    throw("Somehow, a GK was rnged but got versatile, please contact meo");
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
            break;
    }
}

function generatePlayer(position){
    positionReturned = generatePosition(position);
    player = {position:"", rating:0, potential:0,trait:"",age:0};
    player.position = positionReturned;
    rngPlayer(player);
    return player;
}

function generatePlayers(count,position){
    players = [];
    if(position == "Any"){
        for(let i=0;i<count;i++){
            players[i] = generatePlayer("Any");
        }
    }
    else{
        players[0] = generatePlayer(position);
    }
    return players;
}

function upgradePlayers(players,level){
    // for(let i = 0; i< players.length; i++){
    // }

    return players;
}

function stringify(player){
    string = player.rating + "/" + player.potential + " " + player.position + " PlayerName " + player.age + " :flag_fr: " + player.trait;
    return string;
}

function rngString(count, position, level) {
    players = generatePlayers(count,position);
    players = upgradePlayers(players,level);
    size = players.length;
    if (count == 1 && position != "Any"){
        generatedString = "A youth player with the position " + position + " was rnged. \n";
        generatedString= generatedString + "They are: " + stringify(players[0]);
    }
    else if (count > 1){
        generatedString = "The following youth players were generated: \n"
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
            .addChoices({ name: "Basic", value: "Basic" }, { name: "Decent", value: "Decent" }, { name: "Good", value: "Good" }, { name: "Great", value: "Great" }, { name: "Elite", value: "Elite" })
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