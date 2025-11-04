const Player = require('./Player');
const PackOpening = require('./packOpening');

class Packs{

  static async openEliteHunterPack(count) {
    let numbers = generateRandomNumbers(count, 1, 100);
    let players = [];

    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] > 0 && numbers[i] <= 4) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(75));
        } else if (numbers[i] > 4 && numbers[i] <= 9) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(76));
        } else if (numbers[i] > 9 && numbers[i] <= 19) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(77));
        } else if (numbers[i] > 19 && numbers[i] <= 29) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(78));
        } else if (numbers[i] > 29 && numbers[i] <= 39) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(79));
        } else if (numbers[i] > 39 && numbers[i] <= 44) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(80));
        } else if (numbers[i] > 44 && numbers[i] <= 59) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(81));
        } else if (numbers[i] > 59 && numbers[i] <= 69) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(82));
        } else if (numbers[i] > 69 && numbers[i] <= 76) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(83));
        } else if (numbers[i] > 76 && numbers[i] <= 82) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(84));
        } else if (numbers[i] > 82 && numbers[i] <= 90) {
            players.push(await PackOpening.GenerateNonEliteSpecial());
        } else if (numbers[i] > 90 && numbers[i] <= 100) {
            players.push(await PackOpening.GenerateElite());
        }
    }

    return players;
}


static async openRarePlayersPack(count) {
    let numbers = generateRandomNumbers(count, 1, 100);
    let players = [];

    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] > 0 && numbers[i] <= 9) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(75));
        } else if (numbers[i] > 9 && numbers[i] <= 19) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(76));
        } else if (numbers[i] > 19 && numbers[i] <= 26) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(77));
        } else if (numbers[i] > 26 && numbers[i] <= 37) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(78));
        } else if (numbers[i] > 37 && numbers[i] <= 47) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(79));
        } else if (numbers[i] > 47 && numbers[i] <= 59) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(80));
        } else if (numbers[i] > 59 && numbers[i] <= 72) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(81));
        } else if (numbers[i] > 72 && numbers[i] <= 81) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(82));
        } else if (numbers[i] > 81 && numbers[i] <= 88) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(83));
        } else if (numbers[i] > 88 && numbers[i] <= 92) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(84));
        } else if (numbers[i] > 92 && numbers[i] <= 95) {
            players.push(await PackOpening.GenerateNonEliteSpecial());
        } else if (numbers[i] > 95 && numbers[i] <= 100) {
            players.push(await PackOpening.GenerateElite());
        }
    }

    return players;
}



static async openRarerPlayersPack(count) {
    let numbers = generateRandomNumbers(count, 1, 100);
    let players = [];

    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] > 0 && numbers[i] <= 8) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(75));
        } else if (numbers[i] > 8 && numbers[i] <= 15) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(76));
        } else if (numbers[i] > 15 && numbers[i] <= 24) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(77));
        } else if (numbers[i] > 24 && numbers[i] <= 34) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(78));
        } else if (numbers[i] > 34 && numbers[i] <= 49) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(79));
        } else if (numbers[i] > 49 && numbers[i] <= 59) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(80));
        } else if (numbers[i] > 59 && numbers[i] <= 67) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(81));
        } else if (numbers[i] > 67 && numbers[i] <= 74) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(82));
        } else if (numbers[i] > 74 && numbers[i] <= 81) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(83));
        } else if (numbers[i] > 81 && numbers[i] <= 87) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(84));
        } else if (numbers[i] > 87 && numbers[i] <= 93) {
            players.push(await PackOpening.GenerateNonEliteSpecial());
        } else if (numbers[i] > 93 && numbers[i] <= 100) {
            players.push(await PackOpening.GenerateElite());
        }
    }

    return players;
}



static async openGoldPack(count) {
    let numbers = generateRandomNumbers(count, 1, 200);
    let players = [];

    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] > 0 && numbers[i] <= 50) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(75));
        } else if (numbers[i] > 51 && numbers[i] <= 80) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(76));
        } else if (numbers[i] > 80 && numbers[i] <= 110) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(77));
        } else if (numbers[i] > 110 && numbers[i] <= 145) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(78));
        } else if (numbers[i] > 145 && numbers[i] <= 165) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(79));
        } else if (numbers[i] > 165 && numbers[i] <= 175) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(80));
        } else if (numbers[i] > 175 && numbers[i] <= 185) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(81));
        } else if (numbers[i] > 185 && numbers[i] <= 193) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(82));
        } else if (numbers[i] > 193 && numbers[i] <= 197) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(83));
        } else if (numbers[i] > 198 && numbers[i] <= 199) {
            players.push(await PackOpening.GenerateNonEliteSpecial());
        } else if (numbers[i] > 199 && numbers[i] <= 200) {
            players.push(await PackOpening.GenerateElite());
        }
    }

    return players;
}

static async openPremiumGoldPack(count) {
    let numbers = generateRandomNumbers(count, 1, 100);
    let players = [];

    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] > 0 && numbers[i] <= 24) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(75));
        } else if (numbers[i] > 24 && numbers[i] <= 44) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(76));
        } else if (numbers[i] > 44 && numbers[i] <= 58) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(77));
        } else if (numbers[i] > 58 && numbers[i] <= 68) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(78));
        } else if (numbers[i] > 68 && numbers[i] <= 77) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(79));
        } else if (numbers[i] > 77 && numbers[i] <= 84) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(80));
        } else if (numbers[i] > 84 && numbers[i] <= 89) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(81));
        } else if (numbers[i] > 89 && numbers[i] <= 94) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(82));
        } else if (numbers[i] > 94 && numbers[i] <= 97) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(83));
        } else if (numbers[i] > 97 && numbers[i] <= 98) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(84));
        } else if (numbers[i] > 98 && numbers[i] <= 99) {
            players.push(await PackOpening.GenerateNonEliteSpecial());
        } else if (numbers[i] > 99 && numbers[i] <= 100) {
            players.push(await PackOpening.GenerateElite());
        }
    }

    return players;
}

static async openJumboPremiumGoldPack(count) {
    let numbers = generateRandomNumbers(count, 1, 100);
    let players = [];

    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] > 0 && numbers[i] <= 14) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(75));
        } else if (numbers[i] > 14 && numbers[i] <= 29) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(76));
        } else if (numbers[i] > 29 && numbers[i] <= 44) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(77));
        } else if (numbers[i] > 44 && numbers[i] <= 54) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(78));
        } else if (numbers[i] > 54 && numbers[i] <= 64) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(79));
        } else if (numbers[i] > 64 && numbers[i] <= 74) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(80));
        } else if (numbers[i] > 74 && numbers[i] <= 81) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(81));
        } else if (numbers[i] > 81 && numbers[i] <= 88) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(82));
        } else if (numbers[i] > 88 && numbers[i] <= 93) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(83));
        } else if (numbers[i] > 93 && numbers[i] <= 96) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(84));
        } else if (numbers[i] > 96 && numbers[i] <= 98) {
            players.push(await PackOpening.GenerateNonEliteSpecial());
        } else if (numbers[i] > 98 && numbers[i] <= 100) {
            players.push(await PackOpening.GenerateElite());
        }
    }

    return players;
}

static async openGoldUpgradePack(count) {
    let numbers = generateRandomNumbers(count, 1, 100);
    let players = [];

    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] > 0 && numbers[i] <= 25) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(78));
        } else if (numbers[i] > 25 && numbers[i] <= 40) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(79));
        } else if (numbers[i] > 40 && numbers[i] <= 55) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(80));
        } else if (numbers[i] > 55 && numbers[i] <= 70) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(81));
        } else if (numbers[i] > 70 && numbers[i] <= 80) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(82));
        } else if (numbers[i] > 80 && numbers[i] <= 90) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(83));
        } else if (numbers[i] > 90 && numbers[i] <= 96) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(84));
        } else if (numbers[i] > 96 && numbers[i] <= 98) {
            players.push(await PackOpening.GenerateNonEliteSpecial());
        } else if (numbers[i] > 98 && numbers[i] <= 100) {
            players.push(await PackOpening.GenerateElite());
        }
    }

    return players;
}

static async openBronzePack(count) {
    let numbers = generateRandomNumbers(count, 1, 144);
    let players = [];

    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] > 0 && numbers[i] <= 12) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(53));
        } else if (numbers[i] > 12 && numbers[i] <= 24) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(54));
        } else if (numbers[i] > 24 && numbers[i] <= 36) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(55));
        } else if (numbers[i] > 36 && numbers[i] <= 48) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(56));
        } else if (numbers[i] > 48 && numbers[i] <= 60) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(57));
        } else if (numbers[i] > 60 && numbers[i] <= 72) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(58));
        } else if (numbers[i] > 72 && numbers[i] <= 84) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(59));
        } else if (numbers[i] > 84 && numbers[i] <= 96) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(60));
        } else if (numbers[i] > 96 && numbers[i] <= 108) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(61));
        } else if (numbers[i] > 108 && numbers[i] <= 120) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(62));
        } else if (numbers[i] > 120 && numbers[i] <= 132) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(63));
        } else if (numbers[i] > 132 && numbers[i] <= 144) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(64));
        }
    }

    return players;
}

static async openPremiumSilverPack(count) {
    let numbers = generateRandomNumbers(count, 1, 100);
    let players = [];

    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] > 0 && numbers[i] <= 10) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(65));
        } else if (numbers[i] > 10 && numbers[i] <= 20) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(66));
        } else if (numbers[i] > 20 && numbers[i] <= 30) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(67));
        } else if (numbers[i] > 30 && numbers[i] <= 40) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(68));
        } else if (numbers[i] > 40 && numbers[i] <= 50) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(69));
        } else if (numbers[i] > 50 && numbers[i] <= 60) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(70));
        } else if (numbers[i] > 60 && numbers[i] <= 70) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(71));
        } else if (numbers[i] > 70 && numbers[i] <= 80) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(72));
        } else if (numbers[i] > 80 && numbers[i] <= 90) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(73));
        } else if (numbers[i] > 90 && numbers[i] <= 96) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(74));
        } else if (numbers[i] > 96 && numbers[i] <= 100) {
            players.push(await PackOpening.GenerateRandomPlayerByCardType(6));
        }
    }

    return players;
}

static async openSilverPack(count) {
    let numbers = generateRandomNumbers(count, 1, 100);
    let players = [];

    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] > 0 && numbers[i] <= 17) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(65));
        } else if (numbers[i] > 17 && numbers[i] <= 30) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(66));
        } else if (numbers[i] > 30 && numbers[i] <= 40) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(67));
        } else if (numbers[i] > 40 && numbers[i] <= 52) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(68));
        } else if (numbers[i] > 52 && numbers[i] <= 64) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(69));
        } else if (numbers[i] > 64 && numbers[i] <= 73) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(70));
        } else if (numbers[i] > 73 && numbers[i] <= 83) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(71));
        } else if (numbers[i] > 83 && numbers[i] <= 89) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(72));
        } else if (numbers[i] > 89 && numbers[i] <= 95) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(73));
        } else if (numbers[i] > 95 && numbers[i] <= 98) {
            players.push(await PackOpening.GenerateRandomPlayerByRating(74));
        } else if (numbers[i] > 98 && numbers[i] <= 100) {
            players.push(await PackOpening.GenerateRandomPlayerByCardType(6));
        }
    }

    return players;
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

module.exports = Packs;