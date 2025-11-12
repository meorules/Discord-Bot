const { SlashCommandBuilder } = require('discord.js');

const Player = require('../modules/Player.js');
const Team = require('../modules/team.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('player-transfer')
        .setDescription('Transfer players from one team to another. Make sure the person from owns the player')
        .addStringOption(option => 
            option.setName('name')
            .setDescription('Name of the player you want to move')
            .setRequired(true)
        )
        .addUserOption((option) =>
            option
            .setName("username-to")
            .setRequired(true)
            .setDescription("Username to add player to (if not yourself)"),
        )
        .addUserOption((option) =>
            option
            .setName("username-from")
            .setRequired(false)
            .setDescription("Username to move player from (if not yourself)"),
        ),
    async execute(interaction) {
        let name = interaction.options.getString("name");
        let commandUsername = interaction.user.username;
        let toUsername = interaction.options.getUser("username-to").username;
        let fromUsername = interaction.options.getUser("username-from");
        let username = "";

        if(fromUsername){
            if(fromUsername == toUsername){
                return interaction.reply("You think you're sly, you are not actually doing anything lol");
            }
            console.log(commandUsername);
            console.log(!commandUsername.toLowerCase().trim().includes("meo_rules") && !commandUsername.toLowerCase().trim().includes("mun25"));
            if((!commandUsername.toLowerCase().trim().includes("meo_rules") && !commandUsername.toLowerCase().trim().includes("mun25")  && !commandUsername.toLowerCase().trim().includes("a.h.m.e.d.") && !commandUsername.toLowerCase().trim().includes("billygilmour") && !commandUsername.toLowerCase().trim().includes("witzbold_1704")) && fromUsername != commandUsername){
                return interaction.reply("Only mods can transfer players which are not on their team. Please do not attempt to move a player from someone else's team.");
            }
            else{
                username = fromUsername.username;
            }
        }
        else{
            username = commandUsername;
        }


        teamToRemove = await Team.RetrieveTeamByUser(username);
        teamToAdd = await Team.RetrieveTeamByUser(toUsername);
        const { playerTransferred, playerFoundIndex } = await Team.TransferPlayer(teamToRemove,teamToAdd,name);
        if(playerTransferred && playerFoundIndex != -1){
            let playerFound = teamToRemove.mPlayers[playerFoundIndex];
            try{
                const playerLogChannel = interaction.client.channels.cache.get("1437279237370548234");
                let playersgeneratedString = await playerFound.stringify();
                playerLogChannel.send("``` ``` \n" + Date() + " - **Player Transfer Command** Previous Team (" + teamToRemove.mTeamName +  ") New Team (" + teamToAdd.mTeamName +  ") Player Transferred:\n"+ playersgeneratedString);
            }
            catch(err){
                console.error(err);
            }
            return interaction.reply(`The following player was removed from ${teamToRemove.mTeamName} and added to ${teamToAdd.mTeamName}: \n ${await playerFound.stringify()}`);

        }
        else{
            return interaction.reply('Unable to complete player transfer. Either the player is not on the team or the name passed in is incorrect.');
        }
    },
};