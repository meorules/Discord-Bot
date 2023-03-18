const { SlashCommandBuilder } = require('discord.js');

function calcTOTSUpgrade(overall) {
    if (overall >= 88) {
        return 0;
    } else if (overall >= 84 && overall <= 87) {
        return 1;
    } else if (overall >= 81 && overall <= 83) {
        return 2;
    } else if (overall >= 77 && overall <= 80) {
        return 3;
    } else if (overall <= 76) {
        return 4;
    }
}

function starterUpgrades(age, growth, averageRating) {
    let upgrade = 0;
    if (growth == 0) {
        if (33 <= age) {
            if (averageRating >= 76) {
                upgrade = 0;
            } else if (averageRating >= 69 && averageRating <= 75) {
                upgrade = -1;
            } else if (averageRating >= 64 && averageRating <= 68) {
                upgrade = -2;
            } else if (averageRating >= 57 && averageRating <= 63) {
                upgrade = -3;
            } else if (averageRating <= 56) {
                upgrade = -4;
            }
        } else if (age <= 32 && age >= 30) {
            if (averageRating >= 71) {
                upgrade = 1;
            } else if (averageRating >= 65 && averageRating <= 70) {
                upgrade = 0;
            } else if (averageRating >= 60 && averageRating <= 64) {
                upgrade = -1;
            } else if (averageRating >= 56 && averageRating <= 59) {
                upgrade = -2;
            } else if (averageRating <= 55) {
                upgrade = -3;
            }
        } else if (age < 30) {
            if (averageRating >= 71) {
                upgrade = 1;
            } else if (averageRating >= 63 && averageRating <= 70) {
                upgrade = 0;
            } else if (averageRating >= 58 && averageRating <= 62) {
                upgrade = -1;
            } else if (averageRating >= 55 && averageRating <= 57) {
                upgrade = -2;
            } else if (averageRating <= 54) {
                upgrade = -3;
            }
        }
    } else if (growth == 1 || growth == 2) {
        if (averageRating >= 75) {
            upgrade = 2;
        } else if (averageRating >= 68 && averageRating <= 74) {
            upgrade = 1;
        } else if (averageRating >= 60 && averageRating <= 67) {
            upgrade = 0;
        } else if (averageRating >= 55 && averageRating <= 59) {
            upgrade = -2;
        } else if (averageRating <= 54) {
            upgrade = -3;
        }

    } else if (growth == 3 || growth == 4 || growth == 5 || growth == 6) {
        if (averageRating >= 80) {
            upgrade = 3;
        } else if (averageRating >= 70 && averageRating <= 79) {
            upgrade = 2;
        } else if (averageRating >= 60 && averageRating <= 69) {
            upgrade = 1;
        } else if (averageRating >= 55 && averageRating <= 59) {
            upgrade = 0;
        } else if (averageRating <= 54) {
            upgrade = -1;
        }

    } else if (growth => 7 && growth <= 11) {
        if (averageRating >= 80) {
            upgrade = 4;
        } else if (averageRating >= 70 && averageRating <= 79) {
            upgrade = 3;
        } else if (averageRating >= 65 && averageRating <= 69) {
            upgrade = 2;
        } else if (averageRating >= 60 && averageRating <= 64) {
            upgrade = 1;
        } else if (averageRating >= 55 && averageRating <= 59) {
            upgrade = 0;
        } else if (averageRating <= 54) {
            upgrade = -1;
        }

    } else if (growth => 12) {
        if (averageRating >= 80) {
            upgrade = 5;
        } else if (averageRating >= 70 && averageRating <= 79) {
            upgrade = 4;
        } else if (averageRating >= 65 && averageRating <= 69) {
            upgrade = 3;
        } else if (averageRating >= 60 && averageRating <= 64) {
            upgrade = 2;
        } else if (averageRating >= 55 && averageRating <= 59) {
            upgrade = 2;
        } else if (averageRating <= 54) {
            upgrade = 1;
        }

    }

    return upgrade;
}

function backupUpgrades(age) {
    if (age >= 33) {
        return -3;
    } else if (age >= 31 && age <= 32) {
        return -2;
    } else if (age >= 28 && age <= 30) {
        return -1;
    } else if (age >= 24 && age <= 27) {
        return 1;
    } else if (age >= 20 && age <= 23) {
        return 2;
    } else if (age >= 16 && age <= 19) {
        return 4;
    }

}


function calcPositionAverage(position, averageRating) {
    if (position == "GK" || position == "CB" || position == "RB" || position == "LB" || position == "LWB" || position == "RWB" || position == "CDM") {
        return averageRating + 6;
    } else if (position == "CM") {
        return averageRating + 5;
    } else if (position == "CAM" || position == "LM" || position == "RM") {
        return averageRating + 3;
    } else {
        return averageRating;
    }

}

function highRatedPlayerCalculator(rating, averageRating) {
    minusRating = 0;

    if (rating >= 91) {
        minusRating = -5;
    } else if (rating <= 90 && rating >= 88) {
        minusRating = -3;
    } else if (rating <= 87 && rating >= 85) {
        minusRating = -2;
    } else if (rating <= 84 && rating >= 82) {
        minusRating = -1;
    }

    return averageRating + minusRating;

}


function dynamicPotential(averageRating) {

    if (averageRating >= 74) {
        return 3;
    } else if (averageRating == 72 || averageRating == 73) {
        return 2;
    }
    return 0;

}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('calcupgrade')
        .setDescription("Calculate a single player's new overall, potential and age:)")
        .addBooleanOption(option => option.setName('tots').setDescription('Put 1 if they are in the TOTS and 0 if not'))
        .addBooleanOption(option => option.setName('starter').setDescription('Put 1 if they played 10 or more games and 0 if they played less than 10 games.'))
        .addIntegerOption(option => option.setName('overall').setDescription("The player's overall rating before boosts"))
        .addIntegerOption(option => option.setName('potential').setDescription("The player's potential rating before boosts"))
        .addStringOption(option => option.setName('position').setDescription("The player's position during the sim, such as LW, RW, ST, CF, CAM, etc"))
        .addIntegerOption(option => option.setName('averagerating').setDescription("The average rating of the player before positional modifiers, but with training added. ex. 76 or 68"))
        .addIntegerOption(option => option.setName('age').setDescription('The age of the player)'))
        .addStringOption(option => option.setName('name').setDescription("The player's name so I can print it nicely :) ")),
    async execute(interaction) {
        overall = interaction.options.getInteger('overall');
        potential = interaction.options.getInteger('potential');
        position = interaction.options.getString('position');
        playerName = interaction.options.getString('name');
        age = interaction.options.getInteger('age');


        if (interaction.options.getBoolean('starter') == true) {
            growth = potential - overall;
            if (overall >= 82) {
                averageRating = highRatedPlayerCalculator(overall, interaction.options.getInteger('averagerating'));
            } else {
                averageRating = interaction.options.getInteger('averagerating');

            }
            positionAverage = calcPositionAverage(position, averageRating);
            overallAddition = starterUpgrades(age, growth, positionAverage);
            finalOverall = overallAddition + overall;

            if (age <= 23 && (potential - finalOverall) <= 3 && potential <= 90) {

                potential = potential + dynamicPotential(positionAverage);

            }
            if (interaction.options.getBoolean('tots') == true) {
                potential = potential + calcTOTSUpgrade(finalOverall)
                finalOverall = finalOverall + calcTOTSUpgrade(finalOverall)
            }

            if (potential <= finalOverall) {
                potential = finalOverall;
            }
        } else {
            overallAddition = backupUpgrades(age);
            finalOverall = overallAddition + overall;

        }
        if (potential <= finalOverall) {
            potential = finalOverall;
        }



        age = age + 1;

        await interaction.reply({ content: `\`${playerName}\` \`${position}\` \`${finalOverall}\`/\`${potential}\` \`${age}\`` });
    },
};