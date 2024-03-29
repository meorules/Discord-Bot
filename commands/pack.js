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
// 53 and below	1-585	1-51
// 54	1-231	1-49
// 55	1-250	1-65
// 56	1-303	1-60
// 57	1-322	1-64
// 58	1-409	1-85
// 59	1-437	1-82
// 60	1-625	1-106
// 61	1-648	1-93
// 62	1-840	1-95
// 63	1-963	1-101
// 64	1-1059	1-120

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
                return randomizerGKArray[104 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 164);
                return randomizerPlayerArray[696 + rng - 1];
            }
            break;
        case 77:
            if (position == 1) {
                rng = generateRandomNumber(1, 16);
                return randomizerGKArray[120 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 212);
                return randomizerPlayerArray[860 + rng - 1];
            }
            break;
        case 76:
            if (position == 1) {
                rng = generateRandomNumber(1, 27);
                return randomizerGKArray[136 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 270);
                return randomizerPlayerArray[1072 + rng - 1];
            }
            break;
        case 75:
            if (position == 1) {
                rng = generateRandomNumber(1, 32);
                return randomizerGKArray[163 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 267);
                return randomizerPlayerArray[1342 + rng - 1];
            }
            break;
        case 74:
            if (position == 1) {
                rng = generateRandomNumber(1, 42);
                return randomizerGKArray[195 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 434);
                return randomizerPlayerArray[1609 + rng - 1];
            }
            break;
        case 73:
            if (position == 1) {
                rng = generateRandomNumber(1, 55);
                return randomizerGKArray[237 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 482);
                return randomizerPlayerArray[2043 + rng - 1];
            }
            break;
        case 72:
            if (position == 1) {
                rng = generateRandomNumber(1, 67);
                return randomizerGKArray[292 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 586);
                return randomizerPlayerArray[2525 + rng - 1];
            }
            break;
        case 71:
            if (position == 1) {
                rng = generateRandomNumber(1, 71);
                return randomizerGKArray[359 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 667);
                return randomizerPlayerArray[3111 + rng - 1];
            }
            break;
        case 70:
            if (position == 1) {
                rng = generateRandomNumber(1, 73);
                return randomizerGKArray[430 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 783);
                return randomizerPlayerArray[3778 + rng - 1];
            }
            break;
        case 69:
            if (position == 1) {
                rng = generateRandomNumber(1, 71);
                return randomizerGKArray[503 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 902);
                return randomizerPlayerArray[4561 + rng - 1];
            }
            break;
        case 68:
            if (position == 1) {
                rng = generateRandomNumber(1, 93);
                return randomizerGKArray[574 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 929);
                return randomizerPlayerArray[5463 + rng - 1];
            }
            break;
        case 67:
            if (position == 1) {
                rng = generateRandomNumber(1, 90);
                return randomizerGKArray[667 + rng - 1];
            } else {
                rng = generateRandomNumber(1, 1015);
                return randomizerPlayerArray[6392 + rng - 1];
            }
            break;
        case 66:
            if (position == 1) {
                rng = generateRandomNumber(1, 108);
                return randomizerGKArray[757 + rng - 1];
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
    } else {
        position = generateRandomNumber(1, 11);
        if (position == 1) {
            //generate GK
            rng = generateRandomNumber(1, randomizerGKPromoElites.length);
            return randomizerGKPromoElites[rng - 1];
        } else {
            //generateOutfielder
            rng = generateRandomNumber(1, randomizerPromoElites.length);
            return randomizerPromoElites[rng - 1];
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

function openBronzePack() {
    return null;
}

function openSilverPack() {
    return null;
}

function openGoldPack(promoInPacks) {
    numbers = generateRandomNumbers(3, 1, 200);
    players = [];

    for (let i = 0; i < 3; i++) {
        if (numbers[i] > 0 && numbers[i] <= 50) {
            players.push(generatePlayer(75));
        } else if (numbers[i] > 51 && numbers[i] <= 80) {
            players.push(generatePlayer(76));
        } else if (numbers[i] > 80 && numbers[i] <= 110) {
            players.push(generatePlayer(77));
        } else if (numbers[i] > 110 && numbers[i] <= 145) {
            players.push(generatePlayer(78));
        } else if (numbers[i] > 145 && numbers[i] <= 165) {
            players.push(generatePlayer(79));
        } else if (numbers[i] > 165 && numbers[i] <= 175) {
            players.push(generatePlayer(80));
        } else if (numbers[i] > 175 && numbers[i] <= 185) {
            players.push(generatePlayer(81));
        } else if (numbers[i] > 185 && numbers[i] <= 193) {
            players.push(generatePlayer(82));
        } else if (numbers[i] > 193 && numbers[i] <= 197) {
            players.push(generatePlayer(83));
        } else if (numbers[i] > 197 && numbers[i] <= 198) {
            players.push(generatePlayer(84));
        } else if (numbers[i] > 198 && numbers[i] <= 199) {
            players.push(generateNonSpecialElite());
        } else if (numbers[i] > 199 && numbers[i] <= 200) {
            players.push(generateElite(promoInPacks));
        }
    }

    return players;
}

function openPremiumGoldPack(promoInPacks) {
    numbers = generateRandomNumbers(3, 1, 100);
    players = [];

    for (let i = 0; i < 3; i++) {
        if (numbers[i] > 0 && numbers[i] <= 24) {
            players.push(generatePlayer(75));
        } else if (numbers[i] > 24 && numbers[i] <= 44) {
            players.push(generatePlayer(76));
        } else if (numbers[i] > 44 && numbers[i] <= 58) {
            players.push(generatePlayer(77));
        } else if (numbers[i] > 58 && numbers[i] <= 68) {
            players.push(generatePlayer(78));
        } else if (numbers[i] > 68 && numbers[i] <= 77) {
            players.push(generatePlayer(79));
        } else if (numbers[i] > 77 && numbers[i] <= 84) {
            players.push(generatePlayer(80));
        } else if (numbers[i] > 84 && numbers[i] <= 89) {
            players.push(generatePlayer(81));
        } else if (numbers[i] > 89 && numbers[i] <= 94) {
            players.push(generatePlayer(82));
        } else if (numbers[i] > 94 && numbers[i] <= 97) {
            players.push(generatePlayer(83));
        } else if (numbers[i] > 97 && numbers[i] <= 98) {
            players.push(generatePlayer(84));
        } else if (numbers[i] > 98 && numbers[i] <= 99) {
            players.push(generateNonSpecialElite());
        } else if (numbers[i] > 99 && numbers[i] <= 100) {
            players.push(generateElite(promoInPacks));
        }
    }

    return players;
}

function openJumboPremiumGoldPack(promoInPacks) {
    numbers = generateRandomNumbers(5, 1, 100);
    players = [];

    for (let i = 0; i < 5; i++) {
        if (numbers[i] > 0 && numbers[i] <= 14) {
            players.push(generatePlayer(75));
        } else if (numbers[i] > 14 && numbers[i] <= 29) {
            players.push(generatePlayer(76));
        } else if (numbers[i] > 29 && numbers[i] <= 44) {
            players.push(generatePlayer(77));
        } else if (numbers[i] > 44 && numbers[i] <= 54) {
            players.push(generatePlayer(78));
        } else if (numbers[i] > 54 && numbers[i] <= 64) {
            players.push(generatePlayer(79));
        } else if (numbers[i] > 64 && numbers[i] <= 74) {
            players.push(generatePlayer(80));
        } else if (numbers[i] > 74 && numbers[i] <= 81) {
            players.push(generatePlayer(81));
        } else if (numbers[i] > 81 && numbers[i] <= 88) {
            players.push(generatePlayer(82));
        } else if (numbers[i] > 88 && numbers[i] <= 93) {
            players.push(generatePlayer(83));
        } else if (numbers[i] > 93 && numbers[i] <= 96) {
            players.push(generatePlayer(84));
        } else if (numbers[i] > 96 && numbers[i] <= 98) {
            players.push(generateNonSpecialElite());
        } else if (numbers[i] > 98 && numbers[i] <= 100) {
            players.push(generateElite(promoInPacks));
        }
    }

    return players;
}

function openGoldUpgradePack(promoInPacks) {
    numbers = generateRandomNumbers(2, 1, 100);
    players = [];

    for (let i = 0; i < 2; i++) {
        if (numbers[i] > 0 && numbers[i] <= 25) {
            players.push(generatePlayer(78));
        } else if (numbers[i] > 25 && numbers[i] <= 40) {
            players.push(generatePlayer(79));
        } else if (numbers[i] > 40 && numbers[i] <= 55) {
            players.push(generatePlayer(80));
        } else if (numbers[i] > 55 && numbers[i] <= 70) {
            players.push(generatePlayer(81));
        } else if (numbers[i] > 70 && numbers[i] <= 80) {
            players.push(generatePlayer(82));
        } else if (numbers[i] > 80 && numbers[i] <= 90) {
            players.push(generatePlayer(83));
        } else if (numbers[i] > 90 && numbers[i] <= 96) {
            players.push(generatePlayer(84));
        } else if (numbers[i] > 96 && numbers[i] <= 98) {
            players.push(generateNonSpecialElite());
        } else if (numbers[i] > 98 && numbers[i] <= 100) {
            players.push(generateElite(promoInPacks));
        }
    }

    return players;
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

function openPack(packName, promoInPacks) {
    players = []

    switch (packName) {
        case "Bronze Pack(2.5k)":
            players = openBronzePack();
            break;
        case "Silver Pack(5k)":
            players = openSilverPack();
            break;
        case "Gold Pack(10k)":
            players = openGoldPack(promoInPacks);
            break;
        case "Premium Gold Pack(15k)":
            players = openPremiumGoldPack(promoInPacks);
            break;
        case "Jumbo Premium Gold Pack(35k)":
            players = openJumboPremiumGoldPack(promoInPacks);
            break;
        case "Gold Upgrade Pack(78+ x2)":
            players = openGoldUpgradePack(promoInPacks);
            break;
        default:
            throw new Error('Invalid or unadded pack selected');
            break;
    }
    return players;
}

function openPacks(pack, count, promoInPacks) {
    packPlayers = [];
    if (count == 1) {
        packPlayers = openPack(pack, promoInPacks);
    } else {
        for (let i = 0; i < count; i++) {
            individualPackPlayers = openPack(pack, promoInPacks);
            packPlayers = packPlayers.concat(individualPackPlayers);
        }
    }
    return packPlayers;
}

function stringifyPlayer(player) {
    //    [2, "Icon", 94, 2, "Zidane CAM CM", "Gives +2 heading to his teams midfielders (CDM, CM, CAM)"],
    if (player == null) {
        throw new Error('Some invalid player was generated???');
    }
    playerName = player[4].replace('\n', '');
    teamName = player[1].substring(0, player[1].search('[0-9][0-9][0-9][0-9]'));
    toReturn = player[2] + " **" + playerName + "** " + teamName;
    if (player[5] != "") {
        toReturn += " | " + player[5];
    }
    return toReturn;
}

function packOpenString(pack, count, promoInPacks) {
    players = openPacks(pack, count, promoInPacks);

    size = players.length;
    if (count == 1) {
        generatedString = "You opened a " + pack + " and got these players: \n";
    } else {
        generatedString = "You opened " + count + " of the " + pack + " and got these players: \n";
    }

    for (let i = 0; i < size; i++) {
        playerString = stringifyPlayer(players[i]);
        generatedString = generatedString + playerString + "\n";
    }

    return generatedString;
}

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
            .addChoices({ name: "Bronze Pack(2.5k)", value: "Bronze Pack(2.5k)" }, { name: "Silver Pack(5k)", value: "Silver Pack(5k)" }, { name: "Gold Pack(10k)", value: "Gold Pack(10k)" }, { name: "Premium Gold Pack(15k)", value: "Premium Gold Pack(15k)" }, { name: "Jumbo Premium Gold Pack(35k)", value: "Jumbo Premium Gold Pack(35k)" }, { name: "Gold Upgrade Pack(78+ x2)", value: "Gold Upgrade Pack(78+ x2)" })
            .setDescription("The pack you want to open"),
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
            .setDescription("The number of packs you want to open"),
        ),
    async execute(interaction) {
        packName = interaction.options.getString("packname");
        count = interaction.options.getInteger("count");
        promoInPacks = interaction.options.getBoolean('promo');

        if (promoInPacks == null) {
            promoInPacks = true;
        }

        if (count == null) {
            count = 1;
        }

        switch (packName) {
            case "Bronze Pack(2.5k)":
                return interaction.reply("Not yet implemented");
                break;
            case "Silver Pack(5k)":
                return interaction.reply("Not yet implemented");
                break;
        }

        try {
            rngedString = packOpenString(packName, count, promoInPacks);
        } catch (error) {
            console.error(error);
        }

        return interaction.reply(`${rngedString}`);
    },
};