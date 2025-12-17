const { SlashCommandBuilder } = require('discord.js');

const Player = require('../modules/Player.js');
const Team = require('../modules/team.js');
const CardType = require('../modules/cardType.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('db-view')
        .setDescription('View all Players owned by a user in the database')        
        .addIntegerOption((option) =>
            option
            .setName("page")
            .setRequired(false)
            .setDescription("Each page is 18 players"),
        )
        .addStringOption((option) =>
            option
            .setName("club")
            .setRequired(false)
            .setDescription("Club to filter by"),
        )        
        .addStringOption((option) =>
            option
            .setName("nation")
            .setRequired(false)
            .setDescription("Nation to filter by"),
        )
        .addIntegerOption((option) =>
            option
            .setName("maxrating")
            .setRequired(false)
            .setDescription("Maximum rating to filter by"),
        )
        .addIntegerOption((option) =>
            option
            .setName("minrating")
            .setRequired(false)
            .setDescription("Minimum rating to filter by"),
        )
        .addBooleanOption((option) =>
            option
            .setName("gender")
            .setRequired(false)
            .setDescription("Filter by gender (true for male, false for female)")
        )
        .addUserOption((option) =>
            option
            .setName("owner")
            .setRequired(false)
            .setDescription("Show only players that are owned by a user") 
        )
        .addStringOption((option) =>
            option
            .setName("league")
            .setRequired(false)
            .setDescription("Show only players that are from a league") 
        )
        .addStringOption((option) =>
            option
            .setName("position")
            .setRequired(false)
            .setDescription("Show only players that have a specific position") 
        )
        .addStringOption(
            option => option.setName('cardtype')
            .setDescription('Switch the Card Type of the player')
            .setRequired(false)
            .addChoices(CardType.CARD_TYPE_VALUES)
        ),       
    async execute(interaction) {
        let page = interaction.options.getInteger("page");
        let clubFilter = interaction.options.getString("club");
        let nationFilter = interaction.options.getString("nation");
        let leagueFilter = interaction.options.getString("league");
        let positionFilter = interaction.options.getString("position");
        let cardTypeFilter = interaction.options.getString("cardtype");
        let maxRatingFilter = interaction.options.getInteger("maxrating");
        let minRatingFilter = interaction.options.getInteger("minrating");
        let genderFilter = interaction.options.getBoolean("gender");
        let ownerFilter = interaction.options.getUser("owner");

        if (page == null) {
            page = 1;
        }

        let teams = await Team.RetrieveAllTeams();
        if(ownerFilter){
            currentTeam = await Team.RetrieveTeamByUser(ownerFilter.username);
            teams = [currentTeam];
        }
        let totalPlayers = [];

        for(let team of teams){
            let addPlayer = true;
            for(let player of team.mPlayers){
                if(clubFilter && player.mTeam.toLowerCase().trim().includes(clubFilter.toLowerCase().trim()) && nationFilter && player.mCountry.toLowerCase().trim().includes(nationFilter.toLowerCase().trim())){
                    addPlayer = true;
                }
                else if(!clubFilter && nationFilter && player.mCountry.toLowerCase().trim().includes(nationFilter.toLowerCase().trim())){
                    addPlayer = true;
                }
                else if(!nationFilter && clubFilter && player.mTeam.toLowerCase().trim().includes(clubFilter.toLowerCase().trim())){
                    addPlayer = true;
                }
                else if(!clubFilter && !nationFilter){
                    addPlayer = true;
                }
                else{
                    addPlayer = false;
                }

                if(addPlayer){
                    if(!maxRatingFilter && !minRatingFilter){
                        addPlayer = true;
                    }
                    else if(maxRatingFilter && !minRatingFilter && player.mRating <= maxRatingFilter){
                        addPlayer = true;
                    }
                    else if(!maxRatingFilter && minRatingFilter && player.mRating >= minRatingFilter){
                        addPlayer = true;
                    }
                    else if(maxRatingFilter && minRatingFilter && player.mRating <= maxRatingFilter && player.mRating >= minRatingFilter){
                        addPlayer = true;
                    }
                    else{
                        addPlayer = false;
                    }
                }

                if(addPlayer){
                    if(genderFilter == null){
                        addPlayer = true;
                    }
                    else if(genderFilter != null && genderFilter && player.mGender == "Male"){
                        addPlayer = true;
                    }
                    else if(genderFilter != null && !genderFilter && player.mGender == "Female"){
                        addPlayer = true;
                    }
                    else{
                        addPlayer = false;
                    }
                }

                if(addPlayer){
                    if(!leagueFilter){
                        addPlayer = true;
                    }
                    else if(leagueFilter && !player.mLeague){
                        addPlayer = false;
                    }
                    else if(leagueFilter && player.mLeague && player.mLeague.toLowerCase().trim().includes(leagueFilter.toLowerCase().trim())){
                        addPlayer = true;
                    }
                    else{
                        addPlayer = false;
                    }
                }

                if(addPlayer){
                    if(!positionFilter){
                        addPlayer = true;
                    }
                    else if(positionFilter && player.mPosition.includes(positionFilter.toUpperCase().trim())){
                        addPlayer = true;
                    }
                    else{
                        addPlayer = false;
                    }
                }

                if(addPlayer){
                    if(!cardTypeFilter){
                        addPlayer = true;
                    }
                    else if(cardTypeFilter && player.mCardTypeID == cardTypeFilter){
                        addPlayer = true;
                    }
                    else{
                        addPlayer = false;
                    }
                }

                if(addPlayer){
                    player.setOwner(team);
                    totalPlayers.push(player);
                }
            }
        }

        //Add way to merge players from different teams and put their owners on the player string

        totalPlayers.sort(Player.sort);
        playerStart = (page-1)*15;
        if (page == 1) {
            playerStart = 0;
        }
        playersEnd = playerStart + 15;



        condensedPlayers = totalPlayers.slice(playerStart,playersEnd);
        condensedPlayers.sort(Player.sort);
        if(playersEnd > totalPlayers.length){
            playersEnd = totalPlayers.length
        }

        generatedString = " Players: Page " + page + " - Players "+ (playerStart+1) + "-" + (playersEnd) +  " out of " + totalPlayers.length +" total players \n";



        for(player in condensedPlayers){
            generatedString = generatedString + await condensedPlayers[player].stringify() + "\n";
        }


        return interaction.reply(generatedString);
    },
};