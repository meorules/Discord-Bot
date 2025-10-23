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
playstyles = playerArrays.playstyles;


function generateRandomNumber(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored + 1 - minCeiled) + minCeiled);
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
                    returnedPosition = "LB/RB" ;
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
                    returnedPosition = "ST";
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
                    returnedPosition = "LB/RB" ;
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
                    returnedPosition = "ST";
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
        rating = generateRandomNumber(50,72);
        potential = generateRandomNumber(65,88);
    }
    else if(initialRNG > 0 && initialRNG <= 3){
        rating = generateRandomNumber(50,72);
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
        potential = generateRandomNumber(83,88);
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

function getCountryAPI(player){
    switch (player.secondnation) {
        case "Algeria":
            return countryCodes["Arabic"];
        case "Angola":
            return countryCodes["African"];
        case "Brazil":
            return countryCodes["Portuguese"];
        case "Cameroon":
            return countryCodes["African"];
        case "Cote D'Ivoire":
            return countryCodes["Akan"];
        case "DR Congo":
            return countryCodes["African"];
        case "France":
            return countryCodes["French"];
        case "Germany":
            return countryCodes["German"];
        case "Ghana":
            return countryCodes["African"];
        case "Greece":
            return countryCodes["Greek"];
        case "Guinea":
            return countryCodes["African"];
        case "Italy":
            return countryCodes["Italian"];
        case "Morocco":
            return countryCodes["Arabic"];
        case "Netherlands":
            return countryCodes["Dutch"];
        case "Nigeria":
            return countryCodes["Igbo"];
        case "Poland":
            return countryCodes["Polish"];
        case "Portugal":
            return countryCodes["Portuguese"];
        case "Romania":
            return countryCodes["Romanian"];
        case "Senegal":
            return countryCodes["African"];
        case "Serbia":
            return countryCodes["Serbian"];
        case "Spain":
            return countryCodes["Spanish"];
        case "Syria":
            return countryCodes["Arabic"];
        case "Turkey":
            return countryCodes["Turkish"];
        default:
            throw("Error identifying API Call for 2nd nation");
    }
}

async function generatePlayerName(player){

    baseURL = 'https://www.behindthename.com/api/random.json?&gender=m&randomsurname=yes&key=ma536057346&number=1';

    choice = generateRandomNumber(1,7);
    additive = "&usage_dut=1&usage_fre=1&usage_ger=1";
    // switch(choice){
    //     case 1:
    //         if(player.secondnation != "Germany"){
    //             additive = "&usage_ger=1";
    //         }
    //     case 2:
    //         if(player.secondnation != "France"){
    //             additive = "&usage_fre=1";
    //         }
    //     case 3:
    //         if(player.secondnation != "Netherlands"){
    //         additive = "&usage_dut=1";
    //         }
    //     case 4:
    //         additive = "&usage_dut=1&usage_ger=1";
    //     case 5:
    //         additive = "usage_fre=1&usage_ger=1";
    //     case 6:
    //         additive = "&usage_dut=1&usage_fre=1";
    //     case 7:
    //         additive = "&usage_dut=1&usage_fre=1&usage_ger=1";

    // }


    if(player.secondnation == "Your Choice :)"){
        baseURL = baseURL;
    }
    else if(player.secondnation != "" && player.secondnation != null){
        baseURL = baseURL + "&usage_" + getCountryAPI(player) + "=1";
    }
    else{
        baseURL = baseURL + additive;
    }

    combinedName = "";
    nameLength = 0;
    await fetch(baseURL)
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if(data.names.length == 2){
            combinedName = data.names[0] + " " + data.names[1];
            nameLength = 2;
        }
        else {
            combinedName = data.names[0];
            nameLength = 1;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        console.error('Player Second Nation:',player.secondnation);
        console.error('Player Additive - base nation:',additive);
    });

    if(nameLength == 1 ){
        baseURL = baseURL + additive;
        await fetch(baseURL)
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if(data.names.length == 2){
                combinedName = combinedName + " " + data.names[1];
            }
            else {
                combinedName = combinedName + " " + data.names[0];
            }
        })
        .catch(error => {
            console.error('Error:', error);
            console.error('Player Second Nation:',player.secondnation);
            console.error('Player Additive - base nation:',additive);
        });
    }

    player.playerName = combinedName;
    return combinedName;

}

function versatilePlaystlePlayer(player){
        switch(player.position){
            case "GK":
                chance = generateRandomNumber(1,10);
                if(chance > 5){
                    playstyle = generateRandomNumber(28,33);
                    player.playstyles = playstyles[playstyle];
                }
                break;
            case "LB/RB":
                chance = generateRandomNumber(1,10);
                if(chance > 5){
                    playstyle = generateRandomNumber(16,21);
                    player.playstyles = playstyles[playstyle];
                }
                if(chance >=8){
                    playstyle = generateRandomNumber(22,27);
                    player.playstyles = player.playstyles + ", " + playstyles[playstyle];
                }
                rng = generateRandomNumber(1,3);
                chance = generateRandomNumber(1,10);
                if(chance == 1){
                    player.trait = player.trait + ", Versatile ";
                    if(rng == 1){
                        player.trait = player.trait + "Complete Defender";
                        player.position = "CDM/FB/CB";
                    }
                    else if(rng == 2){
                        player.trait = player.trait + "Wideman";
                        player.position = "FB/WM/W";
                    }
                    else if(rng == 3){
                        player.trait = player.trait + "Box-To-Box";
                        player.position = "CM/CDM/FB";
                    }
                }
                break;
            case "CB":
                chance = generateRandomNumber(1,10);
                if(chance > 5){
                    playstyle = generateRandomNumber(16,21);
                    player.playstyles = playstyles[playstyle];
                }
                if(chance >=8){
                    playstyle = generateRandomNumber(22,27);
                    player.playstyles = player.playstyles + ", " + playstyles[playstyle];
                }
                rng = generateRandomNumber(1,3);
                chance = generateRandomNumber(1,10);
                if(chance == 1){
                    player.trait = player.trait + ", Versatile ";
                    rng = generateRandomNumber(1,2);
                    if(rng == 1){
                        player.trait = player.trait + "Complete Defender";
                        player.position = "CDM/FB/CB";
                    }
                    else if(rng == 2){
                        player.trait = player.trait + "Deep-lying Playmaker";
                        player.position = "CM/CDM/CB";
                    }
                }
                break;
            case "CDM":
                chance = generateRandomNumber(1,10);
                if(chance > 5){
                    playstyle = generateRandomNumber(5,21);
                    if(playstyle>=10 && playstyle<=15){
                        playstyle = generateRandomNumber(16,21);
                    }
                    player.playstyles = playstyles[playstyle];
                }
                if(chance >=8){
                    playstyle = generateRandomNumber(22,27);
                    player.playstyles = player.playstyles + ", " + playstyles[playstyle];
                }
                rng = generateRandomNumber(1,3);
                chance = generateRandomNumber(1,10);
                if(chance == 1){
                    player.trait = player.trait + ", Versatile ";
                    rng = generateRandomNumber(1,4);
                    if(rng == 1){
                        player.trait = player.trait + "Complete Defender";
                        player.position = "CDM/FB/CB";
                    }
                    else if(rng == 2){
                        player.trait = player.trait + "Complete Midfielder";
                        player.position = "CDM/CM/CAM/WM";
                    }
                    else if(rng == 3){
                        player.trait = player.trait + "Box-To-Box";
                        player.position = "CM/CDM/FB";
                    }
                    else if(rng == 4){
                        player.trait = player.trait + "Deep-lying Playmaker";
                        player.position = "CM/CDM/CB";
                    }
                }
                break;
            case "CM":
                chance = generateRandomNumber(1,10);
                if(chance > 5){
                    playstyle = generateRandomNumber(5,21);
                    player.playstyles = playstyles[playstyle];
                }
                if(chance >=8){
                    playstyle = generateRandomNumber(22,27);
                    player.playstyles = player.playstyles + ", " + playstyles[playstyle];
                }
                rng = generateRandomNumber(1,3);
                chance = generateRandomNumber(1,10);
                if(chance == 1){
                    player.trait = player.trait + ", Versatile ";
                    rng = generateRandomNumber(1,3);
                    if(rng == 1){
                        player.trait = player.trait + "Complete Midfielder";
                        player.position = "CDM/CM/CAM/WM";
                    }
                    else if(rng == 2){
                        player.trait = player.trait + "Box-To-Box";
                        player.position = "CM/CDM/FB";
                    }
                    else if(rng == 3){
                        player.trait = player.trait + "Deep-lying Playmaker";
                        player.position = "CM/CDM/CB";
                    }
                }
                break;
            case "CAM":
                chance = generateRandomNumber(1,10);
                if(chance > 5){
                    playstyle = generateRandomNumber(0,15);
                    player.playstyles = playstyles[playstyle];
                }
                if(chance >=8){
                    playstyle = generateRandomNumber(22,27);
                    player.playstyles = player.playstyles + ", " + playstyles[playstyle];
                }
                rng = generateRandomNumber(1,3);
                chance = generateRandomNumber(1,10);
                if(chance == 1){
                    player.trait = player.trait + ", Versatile ";
                    rng = generateRandomNumber(1,2);
                    if(rng == 1){
                        player.trait = player.trait + "Complete Attacker";
                        player.position = "CAM/W/ST";
                    }
                    else if(rng == 2){
                        player.trait = player.trait + "Complete Midfielder";
                        player.position = "CDM/CM/CAM/WM";
                    }
                }
                break;
            case "LW/LM/RM/RW":
                chance = generateRandomNumber(1,10);
                if(chance > 5){
                    playstyle = generateRandomNumber(0,15);
                    player.playstyles = playstyles[playstyle];
                }
                if(chance >=8){
                    playstyle = generateRandomNumber(22,27);
                    player.playstyles = player.playstyles + ", " + playstyles[playstyle];
                }
                rng = generateRandomNumber(1,3);
                chance = generateRandomNumber(1,10);
                if(chance == 1){
                    player.trait = player.trait + ", Versatile ";
                    rng = generateRandomNumber(1,3);
                    if(rng == 1){
                        player.trait = player.trait + "Complete Midfielder";
                        player.position = "CDM/CM/CAM/WM";
                    }
                    else if(rng == 2){
                        player.trait = player.trait + "Complete Attacker";
                        player.position = "CAM/W/ST";
                    }
                    else if(rng == 3){
                        player.trait = player.trait + "Wideman";
                        player.position = "FB/WM/W";
                    }
                }
                break;
            case "ST":
                chance = generateRandomNumber(1,10);
                if(chance > 5){
                    playstyle = generateRandomNumber(0,15);
                    if(playstyle>=5 && playstyle<=9){
                        playstyle = generateRandomNumber(10,15);
                    }
                    player.playstyles = playstyles[playstyle];
                }
                if(chance >=8){
                    playstyle = generateRandomNumber(22,27);
                    player.playstyles = player.playstyles + ", " + playstyles[playstyle];
                }
                rng = generateRandomNumber(1,3);
                chance = generateRandomNumber(1,10);
                if(chance == 1){
                    player.trait = player.trait + ", Versatile ";
                    player.trait = player.trait + "Complete Attacker";
                    player.position = "CAM/W/ST";
                }
                break;
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
        if(growth <= 2){
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

    versatilePlaystlePlayer(player);
    snPlayer(player);
}

function generatePlayer(position,level){
    positionReturned = generatePosition(position);
    player = {position:"", rating:0, potential:0,trait:"",age:0,secondnation:"",playerName:"",playstyles:""};
    player.position = positionReturned;
    switch(level){
        case "Basic":
            //level1RNG(player);
            level5RNG(player);
            player.rating -= 4;
            player.potential -= 4;
            break;
        case "Decent":
            //level2RNG(player);
            level5RNG(player);
            player.rating -= 3;
            player.potential -= 3;
            break;
        case "Good":
            //level3RNG(player);
            level5RNG(player);
            player.rating -= 2;
            player.potential -= 2;
            break;
        case "Great":
            //level4RNG(player);
            level5RNG(player);
            player.rating -= 1;
            player.potential -= 1;
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

async function stringify(player){

    if(player.rating >= 70 || (player.rating >=66 && player.potential >=81)){
        string = "**"  +player.rating + "/" + player.potential + "**";
    }
    else{
        string = player.rating + "/" + player.potential;
    }
    playerName = "PlayerName";
    playerName = await generatePlayerName(player);

    string = string + " **" + player.position + "** "+ playerName + " " + player.age + " :flag_be: *" + player.trait + "*";

    if(player.secondnation == "Your Choice :)"){
        string = string + " You get to choose the nation :)";
    }
    else if(player.secondnation != "" && player.secondnation != null){
        string = string + " " + player.secondnation + " " + countryFlags[player.secondnation];
    }

    // if(player.playstyles != ""){
    //     string = string + " **";
    //     playstylePlus = generateRandomNumber(1,10);
    //     if (playstylePlus > 5){
    //         playstylePlus = generateRandomNumber(1,3);
    //         if(player.playstyles.includes(',')){
    //             playstylesSplit = player.playstyles.split(',');
    //             if(playstylePlus==1){
    //                 string = string + playstylesSplit[0] + "+ and " + playstylesSplit[1];
    //             }
    //             else if(playstylePlus==2){
    //                 string = string + playstylesSplit[0] + " and " + playstylesSplit[1]+ "+";
    //             }
    //             else{
    //                 string = string + playstylesSplit[0] + "+ and " + playstylesSplit[1]+ "+";
    //             }
    //         }
    //         else {
    //             if(playstylePlus==1 ||playstylePlus == 2){
    //                 string = string + player.playstyles + "+";
    //             }

    //         }
    //     }
    //     else{
    //         string = string + player.playstyles;
    //     }
    //     string = string + "**";
    // }

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

async function rngString(count, position, level) {

    players = generatePlayers(count,position,level);

    size = players.length;
    if (count == 1){
        generatedString = "A youth player with the position " + position + " was rnged. Academy Level: " + getLevelString(level) + "\n";
        generatedString = generatedString + "They are: " + await stringify(players[0]);
    }
    else if (count > 1){
        generatedString = "The following youth players were generated at academy Level: " +  getLevelString(level) + "\n"
        for (let i = 0; i < size; i++) {
            generatedString = generatedString + i+1 + ". " + await stringify(players[i]) + "\n";
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