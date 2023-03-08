const { SlashCommandBuilder } = require('discord.js');

function getClosest(val1, val2, target) {
    if (target - val1 >= val2 - target)
        return val2;
    else
        return val1;
}

function getStadiumProfits(stadiumSize, place) {
    if (getClosest(15000, 20000, stadiumSize) == 15000) {
        multiplier = 1;
        cost = 4;
    } else if (getClosest(20000, 30000, stadiumSize) == 20000) {
        multiplier = 2;
        cost = 8;
    } else if (getClosest(30000, 40000, stadiumSize) == 30000) {
        multiplier = 3;
        cost = 17;
    } else if (getClosest(40000, 50000, stadiumSize) == 40000) {
        multiplier = 4;
        cost = 26;
    } else if (getClosest(50000, 75000, stadiumSize) == 50000) {
        multiplier = 5;
        cost = 30;
    } else {
        multiplier = 7.5;
        cost = 62.5;
    }

    stadiumRevenue = multiplier * 19;
    profit = stadiumRevenue - cost;
    // if (place > 10) {
    //     placeMultiplier = 1;
    // } else if (place <= 10 && place < 3) {
    //     placeMultiplier = 1.15;
    // } else if (place == 3 | place == 2) {
    //     placeMultiplier = 1.25;
    // } else {
    //     placeMultiplier = 1.5;
    // }

    // finalProfit = profit * placeMultiplier;
    return profit;

}

function getSeasonPerformanceProfits(place, wins, draws) {
    winProfit = wins * 0.5;
    drawProfit = draws * 0.25;
    performanceProfit = 20 - ((place - 1) * 0.5);
    total = winProfit + drawProfit + performanceProfit;
    return total;
}

function getMerchProfit(merchtier, place, starplayer) {
    if (merchtier == 1) {
        merchProfit = 1.5;
    } else if (merchtier == 2) {
        merchProfit = 3.5;
    } else if (merchtier == 3) {
        merchProfit = 5;
    } else if (merchtier == 4) {
        merchProfit = 15;
    }
    if (starplayer == 1) {
        starPlayerProfit = merchProfit * 1.25;
    } else if (starplayer == 2) {
        starPlayerProfit = merchProfit * 1.5;
    } else {
        starPlayerProfit = merchProfit;
    }

    extraPlaceProfit = starPlayerProfit;
    if (place == 5 | place == 4) {
        extraPlaceProfit = starPlayerProfit * 1.2;
    } else if (place <= 3) {
        extraPlaceProfit = starPlayerProfit * 1.4;
    }

    return extraPlaceProfit;


}

function staffUpKeep(tftier, academytier, hoyd, neg, tclvls, snlvls) {
    if (tftier == 0) {
        trainingUpkeep = 1;
    } else if (tftier == 1) {
        trainingUpkeep = 2;
    } else if (tftier == 2) {
        trainingUpkeep = 2.5;
    } else if (tftier == 3) {
        trainingUpkeep = 3;
    } else if (tftier == 4) {
        trainingUpkeep = 5;
    }

    if (academytier == "Poor") {
        academyUpkeep = 0;
    } else if (academytier == "Average") {
        academyUpkeep = 1;
    } else if (academytier == "Good") {
        academyUpkeep = 2;
    } else if (academytier == "Great") {
        academyUpkeep = 4;
    } else if (academytier == "Elite") {
        academyUpkeep = 5;
    }

    if (hoyd == 0) {
        hoydUpkeep = 0.5;
    } else if (hoyd == 1) {
        hoydUpkeep = 1;
    } else if (hoyd == 2) {
        hoydUpkeep = 1.5;
    } else if (hoyd == 3) {
        hoydUpkeep = 2;
    } else if (hoyd == 4) {
        hoydUpkeep = 2.5;
    }

    if (neg == 0) {
        negUpkeep = 0;
    } else {
        negUpkeep = 0.25 + (0.25 * neg);
    }
    tc = tclvls.split(",");
    tcUpkeep = 0;
    for (i = 0; i < 2; i++) {
        tcUpkeep += tc[i] * 0.25;
    }

    sn = snlvls.split(",");
    snUpkeep = 0;
    for (i = 0; i < 2; i++) {
        snUpkeep += ((1 / 8) * (sn[i] * sn[i])) - ((1 / 8) * sn[i]) + 1;
    }



    totalUpkeep = trainingUpkeep + academyUpkeep + hoydUpkeep + negUpkeep + tcUpkeep + snUpkeep;
    return totalUpkeep;

}

function getPlayerWages(averagerating, clubTier) {
    // 3, 3.5, 4, 4.5, 5
    if (clubTier == "Title") {
        divisor = 2;
    } else if (clubTier == "Euro") {
        divisor = 2.5;
    } else if (clubTier == "Upper Mid") {
        divisor = 4;
    } else if (clubTier == "Lower Mid") {
        divisor = 5;
    } else if (clubTier == "Relegation") {
        divisor = 6;
    }

    return averagerating / divisor;
}

function finalProfits(stadiumProfits, seasonPerformanceProfit, merchProfit, staffupKeep, playerWages) {
    return stadiumProfits + seasonPerformanceProfit + merchProfit - staffupKeep - playerWages;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('calcbudget')
        .setDescription("Calculate your team's next season budget :)")
        .addIntegerOption(option => option.setName('wins').setDescription('The number of wins in the season'))
        .addIntegerOption(option => option.setName('draws').setDescription('The number of draws in the season'))
        .addIntegerOption(option => option.setName('place').setDescription('The position you placed in the table ( just the number ex. 1 or 2 etc.)'))
        .addIntegerOption(option => option.setName('stadiumsize').setDescription('The number of seats your stadium has'))
        .addIntegerOption(option => option.setName('merchtier').setDescription('Merchandising Tier ( ex. 1,2,3 or 4)'))
        .addIntegerOption(option => option.setName('starplayer').setDescription('Star Player Status, put 0 if none, 1 if from outsiders and 2 if from inter fl'))
        .addIntegerOption(option => option.setName('trainingtier').setDescription('Training Facilities Tier ( ex. 0,1,2,3 or 4)'))
        .addStringOption(option => option.setName('academytier').setDescription('Academy Level ( ex. Poor, Average, Good, Great or Elite)'))
        .addIntegerOption(option => option.setName('hoyd').setDescription('HOYD Staff Tier ( ex. 0,1,2,3 or 4)'))
        .addIntegerOption(option => option.setName('negotiator').setDescription('Negotiator Staff Tier ( ex. 1,2,3 or 4)'))
        .addIntegerOption(option => option.setName('averagerating').setDescription('Your Starting XI & Subs Average Rating'))
        .addStringOption(option => option.setName('clubtier').setDescription('Club Tier,(ex. Title, Euro, Upper Mid, Lower Mid,Relegation)'))
        .addStringOption(option => option.setName('tacticscoaches').setDescription('Both Tactics Coach levels, seperated by comma. ( ex. 1,0 or 1,1 or 1,2 etc.)'))
        .addStringOption(option => option.setName('scoutnetwork').setDescription('Both Scouting Network Staff Member levels, seperated by comma. ( ex. 1,0 or 1,1 or 1,2 etc.)')),
    async execute(interaction) {
        place = interaction.options.getInteger('place');
        stadiumProfit = getStadiumProfits(interaction.options.getInteger('stadiumsize'), place);
        seasonalPerformanceProfit = getSeasonPerformanceProfits(place, interaction.options.getInteger('wins'), interaction.options.getInteger('draws'));
        merchProfit = getMerchProfit(interaction.options.getInteger('merchtier'), place, interaction.options.getInteger('starplayer'));
        staffUpkeep = staffUpKeep(interaction.options.getInteger('trainingtier'), interaction.options.getString('academytier'), interaction.options.getInteger('hoyd'), interaction.options.getInteger('negotiator'), interaction.options.getString('tacticscoaches'), interaction.options.getString('scoutnetwork'));
        playerWages = getPlayerWages(interaction.options.getInteger('averagerating'), interaction.options.getString('clubtier'));
        overallProfit = finalProfits(stadiumProfit, seasonalPerformanceProfit, merchProfit, staffUpkeep, playerWages);
        await interaction.reply({ content: `Stadium Profit of \`${stadiumProfit}\`m,Performance Based Profits of \`${seasonalPerformanceProfit}\`m,Merch Profits of \`${merchProfit}\`m, Staff Upkeep of \`${staffUpkeep}\`m, Player Wages of \`${playerWages}\`m, Overall Profit of \`${overallProfit}\`m` });
    },
};