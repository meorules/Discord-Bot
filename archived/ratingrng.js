const {
    SlashCommandBuilder,
    ContextMenuCommandAssertions,
} = require("discord.js");

const playerArrays = require('../readInPlayers.js')
randomizerGKArray = playerArrays.randomizerGKArray;
randomizerPlayerArray = playerArrays.randomizerPlayerArray;
randomizerNonSpecialElite = playerArrays.randomizerNonSpecialElite;
randomizerGKNonSpecialElite = playerArrays.randomizerGKNonSpecialElite;
randomizerGKPromoElites = playerArrays.randomizerGKPromoElites;
randomizerPromoElites = playerArrays.randomizerPromoElites;

function generatePlayer(rating) {

    position = generateRandomNumber(1, 11);

    switch (rating) {
        case 84:
            if (position == 1) {
                rng = generateRandomNumber(1, 6);
                return randomizerGKArray[22 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 45);
                return randomizerPlayerArray[226 + rng - 1];
            }
            break;
        case 83:
            if (position == 1) {
                rng = generateRandomNumber(1, 3);
                return randomizerGKArray[28 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 52);
                return randomizerPlayerArray[271 + rng - 1];
            }
            break;
        case 82:
            if (position == 1) {
                rng = generateRandomNumber(1, 9);
                return randomizerGKArray[31 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 64);
                return randomizerPlayerArray[323 + rng - 1];
            }
            break;
        case 81:
            if (position == 1) {
                rng = generateRandomNumber(1, 10);
                return randomizerGKArray[40 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 77);
                return randomizerPlayerArray[387 + rng - 1];
            }
            break;
        case 80:
            if (position == 1) {
                rng = generateRandomNumber(1, 14);
                return randomizerGKArray[50 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 99);
                return randomizerPlayerArray[464 + rng - 1];
            }
            break;
        case 79:
            if (position == 1) {
                rng = generateRandomNumber(1, 21);
                return randomizerGKArray[64 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 133);
                return randomizerPlayerArray[563 + rng - 1];
            }
            break;
        case 78:
            if (position == 1) {
                rng = generateRandomNumber(1, 19);
                return randomizerGKArray[85 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 164);
                return randomizerPlayerArray[696 + rng - 1];
            }
            break;
        case 77:
            if (position == 1) {
                rng = generateRandomNumber(1, 16);
                return randomizerGKArray[104 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 212);
                return randomizerPlayerArray[860 + rng - 1];
            }
            break;
        case 76:
            if (position == 1) {
                rng = generateRandomNumber(1, 27);
                return randomizerGKArray[120 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 270);
                return randomizerPlayerArray[1072 + rng - 1];
            }
            break;
        case 75:
            if (position == 1) {
                rng = generateRandomNumber(1, 32);
                return randomizerGKArray[157 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 267);
                return randomizerPlayerArray[1342 + rng - 1];
            }
            break;
        case 74:
            if (position == 1) {
                rng = generateRandomNumber(1, 42);
                return randomizerGKArray[189 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 434);
                return randomizerPlayerArray[1609 + rng - 1];
            }
            break;
        case 73:
            if (position == 1) {
                rng = generateRandomNumber(1, 55);
                return randomizerGKArray[231 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 482);
                return randomizerPlayerArray[2043 + rng - 1];
            }
            break;
        case 72:
            if (position == 1) {
                rng = generateRandomNumber(1, 67);
                return randomizerGKArray[286 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 586);
                return randomizerPlayerArray[2525 + rng - 1];
            }
            break;
        case 71:
            if (position == 1) {
                rng = generateRandomNumber(1, 71);
                return randomizerGKArray[353 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 667);
                return randomizerPlayerArray[3111 + rng - 1];
            }
            break;
        case 70:
            if (position == 1) {
                rng = generateRandomNumber(1, 73);
                return randomizerGKArray[424 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 783);
                return randomizerPlayerArray[3778 + rng - 1];
            }
            break;
        case 69:
            if (position == 1) {
                rng = generateRandomNumber(1, 71);
                return randomizerGKArray[497 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 902);
                return randomizerPlayerArray[4561 + rng - 1];
            }
            break;
        case 68:
            if (position == 1) {
                rng = generateRandomNumber(1, 93);
                return randomizerGKArray[568 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 929);
                return randomizerPlayerArray[5463 + rng - 1];
            }
            break;
        case 67:
            if (position == 1) {
                rng = generateRandomNumber(1, 90);
                return randomizerGKArray[661 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 1015);
                return randomizerPlayerArray[6392 + rng - 1];
            }
            break;
        case 66:
            if (position == 1) {
                rng = generateRandomNumber(1, 108);
                return randomizerGKArray[751 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 1018);
                return randomizerPlayerArray[7407 + rng - 1];
            }
            break;
        case 65:
            rng = generateRandomNumber(1, 1035);
            return randomizerPlayerArray[8425 + rng - 1];
            break;
    }
}

function generateEliteGold(gk) {
    if (gk == 1) {
        rng = generateRandomNumber(1, 15);
        count = 0;
        for (let i = 0; i < 22; i++) {
            if (!randomizerGKArray[i][1].includes("Icon") && !randomizerGKArray[i][1].includes("Hero")) {
                if (count + 1 == rng) {
                    return randomizerGKArray[i];
                } else {
                    count++;
                }
            }
        }
    } else {
        rng = generateRandomNumber(1, 76);
        count = 0;
        for (let i = 0; i < 226; i++) {
            if (!randomizerPlayerArray[i][1].includes("Icon") && !randomizerPlayerArray[i][1].includes("Hero")) {
                if (count + 1 == rng) {
                    return randomizerPlayerArray[i];
                } else {
                    count++;
                }
            }
        }
    }

}

function generateNonSpecialElite() {
    if (randomizerGKNonSpecialElite.length == 0) {
        //No GKs, only rng players
        rng = generateRandomNumber(1, randomizerNonSpecialElite.length);
        return randomizerNonSpecialElite[rng - 1];
    } else {
        position = generateRandomNumber(1, 11);
        if (position == 1) {
            //generate GK
            rng = generateRandomNumber(1, randomizerGKNonSpecialElite.length);
            return randomizerGKNonSpecialElite[rng - 1];
        } else {
            //generateOutfielder
            rng = generateRandomNumber(1, randomizerNonSpecialElite.length);
            return randomizerNonSpecialElite[rng - 1];
        }
    }
}

function generatePromoPlayer() {
    if (randomizerGKPromoElites.length == 0) {
        //No GKs, only rng players
        rng = generateRandomNumber(1, randomizerPromoElites.length);
        return randomizerPromoElites[rng - 1];
    } {
        position = generateRandomNumber(1, 11);
        if (position == 1) {
            //generate GK
            index =0;
            mainRNG = generateRandomNumber(1,20);
            if(mainRNG <= 9){
                rng = generateRandomNumber(1,3);
                index=5;
            }
            else if (mainRNG > 9 && mainRNG <= 15){
                index =3;
                rng = generateRandomNumber(1,2);
            }
            else if(mainRNG > 15 && mainRNG <= 18 ){
                rng = generateRandomNumber(1,3);
                index=0;
            }
            else if(mainRNG > 18 && mainRNG <= 20){
                index = 0;
                rng = 0;
            }
            return randomizerGKPromoElites[rng +index];
        } else {
            //generateOutfielder
            index =0;
            mainRNG = generateRandomNumber(1,20);
            if(mainRNG <= 3){
                rng = generateRandomNumber(1,4);
                index=22;
            }
            else if (mainRNG > 3 && mainRNG <= 9){
                index =15;
                rng = generateRandomNumber(1,8);
            }
            else if(mainRNG > 9 && mainRNG <= 15 ){
                rng = generateRandomNumber(1,9);
                index=6;
            }
            else if(mainRNG > 15 && mainRNG <= 19){
                index = 2;
                rng = generateRandomNumber(1,3);
            }
            else if(mainRNG > 19 && mainRNG <= 20){
                index = 0;
                rng = generateRandomNumber(0,2);
            }
            return randomizerPromoElites[rng + index];
        }
    }
}

function generateHero(gk) {
    if (gk == 1) {
        rng = generateRandomNumber(1, 2);
        count = 0;
        for (let i = 0; i < 22; i++) {
            if (randomizerGKArray[i][1].includes("Hero")) {
                if (count + 1 == rng) {
                    return randomizerGKArray[i];
                } else {
                    count++;
                }
            }
        }
    } else {
        rng = generateRandomNumber(1, 55);
        count = 0;
        for (let i = 0; i < 226; i++) {
            if (randomizerPlayerArray[i][1].includes("Hero")) {
                if (count + 1 == rng) {
                    return randomizerPlayerArray[i];
                } else {
                    count++;
                }
            }
        }
    }
}

function generateIcon(gk) {
    if (gk == 1) {
        rng = generateRandomNumber(1, 5);
        count = 0;
        for (let i = 0; i < 22; i++) {
            if (randomizerGKArray[i][1].includes("Icon")) {
                if (count + 1 == rng) {
                    return randomizerGKArray[i];
                } else {
                    count++;
                }
            }
        }
    } else {
        rng = generateRandomNumber(1, 95);
        count = 0;
        for (let i = 0; i < 226; i++) {
            if (randomizerPlayerArray[i][1].includes("Icon")) {
                if (count + 1 == rng) {
                    return randomizerPlayerArray[i];
                } else {
                    count++;
                }
            }
        }
    }
}

function generateElite(promoInPacks) {

    rng = generateRandomNumber(1, 100);
    positionRNG = generateRandomNumber(1, 11);

    if (promoInPacks) {
        if (rng > 0 && rng <= 60) {
            //Gold RNG
            return generateEliteGold(positionRNG);
        } else if (rng > 60 && rng < 85) {
            return generatePromoPlayer();
        } else if (rng > 85 && rng < 97) {
            //Hero
            return generateHero(positionRNG);
        } else if (rng > 97 && rng < 100) {
            //Icon
            return generateIcon(positionRNG);
        }
    } else {
        if (rng > 0 && rng <= 55) {
            //Gold RNG
            return generateEliteGold(positionRNG);
        } else if (rng > 55 && rng < 89) {
            //Hero
            return generateHero(positionRNG);
        } else if (rng > 89 && rng < 100) {
            //Icon
            return generateIcon(positionRNG);
        }
    }
}

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

function stringifyPlayer(player) {
    if (player == null) {
        throw new Error('Some invalid player was generated???');
    }
    playerName = player[4].replace('\n', '');
    if (player[1].includes('Hero')|| player[1].includes('Icon') ) {
        if (player[1].includes('Icon')) {
            toReturn = "__**ICON**__ " + player[2] + " **" + playerName + "** ";
        } else {
            teamName = player[1].substring(player[1].search("\\(") + 1, player[1].search('\\)'));
            toReturn = "__**" + teamName.toUpperCase() + "**__ **Hero** " + player[2] + " **" + playerName + "** ";
        }
    } else if (player[5].includes('TOTS')) {
        teamName = player[1].substring(0, player[1].search('[0-9][0-9][0-9][0-9]'));

        toReturn = "**TEAM OF THE SEASON** " + player[2] + " **" + playerName + "** " + teamName + " | " + player[5];
    } 
    else if (player[5].includes('Workhorses') || player[5].includes('Mid season movers')|| player[5].includes('Tall and small') || player[5].includes('One Club legends')|| player[5].includes('March Madness')|| player[5].includes('International Icons')|| player[5].includes('UEL Heroes')|| player[5].includes('UCL Heroes')) {
        teamName = player[1].substring(0, player[1].search('[0-9][0-9][0-9][0-9]'));

        toReturn = "**PROMO** " + player[2] + " **" + playerName + "** " + teamName + " | " + player[5];
    } else {
        teamName = player[1].substring(0, player[1].search('[0-9][0-9][0-9][0-9]'));

        toReturn = player[2] + " **" + playerName + "** " + teamName;
        if (player[5] != "") {
            toReturn += " | " + player[5];
        }
    }

    return toReturn;
}

function packOpenString(rating, count, promoInPacks) {

    players = [];

    for (let j = 0; j < count; j++) {
        if (rating > 64 && rating <= 84) {
            players.push(generatePlayer(rating));
            if (count == 1) {
                generatedString = "You opened a 1x " + rating + " pack and got these players: \n";
            } else {
                generatedString = "You opened " + count + " of the " + rating + " player pack and got these players: \n";
            }
        } else if (rating == 85) {
            players.push(generateNonSpecialElite());
            if (count == 1) {
                generatedString = "You opened a 1x Non-Special Elite pack and got these players: \n";
            } else {
                generatedString = "You opened " + count + " of the Non-Special Elite player pack and got these players: \n";
            }
        } else if (rating == 86) {
            players.push(generateElite(promoInPacks));
            if (count == 1) {
                generatedString = "You opened a 1x Elite pack and got these players: \n";
            } else {
                generatedString = "You opened " + count + " of the Elite player pack and got these players: \n";
            }
        }
    }


    size = players.length;


    for (let i = 0; i < size; i++) {
        playerString = stringifyPlayer(players[i]);
        generatedString = generatedString + playerString + "\n";
    }

    return generatedString;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ratingrng")
        .setDescription(
            "Open any of the packs for dupe relpacement",
        )
        .addIntegerOption((option) =>
            option
            .setName("rating")
            .setRequired(true)
            .setDescription("The rating you want to rng, put 85 for non special elite and 86 for random elite"),
        )
        .addBooleanOption((option) =>
            option
            .setName("promo")
            .setDescription("Whether there is a promo in packs or not, send 1 if there is")
        )
        .addIntegerOption((option) =>
            option
            .setName("count")
            .setRequired(false)
            .setDescription("The number of players you want to from each pack"),
        ),
    async execute(interaction) {
        rating = interaction.options.getInteger("rating");
        count = interaction.options.getInteger("count");
        promoInPacks = interaction.options.getBoolean('promo');

        if (promoInPacks == null) {
            promoInPacks = true;
        }

        if (count == null) {
            count = 1;
        }

        try {
            rngedString = packOpenString(rating, count, promoInPacks);
        } catch (error) {
            console.error(error);
        }

        return interaction.reply(`${rngedString}`);
    },
};