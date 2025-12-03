const { SlashCommandBuilder } = require('discord.js');

const Player = require('../modules/Player.js');
const Team = require('../modules/team.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('player-bulk-remove')
        .setDescription('Remove players from your team')
        .addStringOption(option => option.setName('names').setDescription('Names of the players you want to remove, separated by commas').setRequired(true))
        .addUserOption(option => option.setName('username').setDescription('Username to remove the player from (if not yourself)').setRequired(false)),
    async execute(interaction) {
        let names = interaction.options.getString("names").split(",");
        let commandUsername = interaction.user.username;
        let retrievedUsername = interaction.options.getUser("username");
        let username = "";

        if(retrievedUsername){
            if((!interaction.member.roles.cache.has("1318943571805736975") && (retrievedUsername.username != commandUsername ))){

            return interaction.reply("You do not have permission to remove players from this team.");
            }
            else{
            username = retrievedUsername.username;
            }
        }
        else{
            username = commandUsername;
        }

        team = await Team.RetrieveTeamByUser(username);
        let removedPlayers = [];
        let removedPlayersString = [];
        let unableToRemove = [];
        var changes;
        for(let player in team.mPlayers){
            for (let name of names){
                changes = 0;
                if(team.mPlayers[player].mPlayerName.toLowerCase().includes(name.toLowerCase().trim())){
                    changes = await Team.RemovePlayerFromTeamByID(team.mID,team.mPlayers[player].mID);
                    if(changes > 0 ){
                        removedPlayers.push(team.mPlayers[player]);
                        removedPlayersString.push(await team.mPlayers[player].stringify());
                    }
                    else {
                        unableToRemove.push(name);
                    }
                }
            }
        }
        let found = false;
        for (let name of names){
            for(let player of removedPlayers){
                if(player.mPlayerName.toLowerCase().includes(name.toLowerCase().trim())){
                    found = true;
                    break;
                }
            }
            if(!found){
                unableToRemove.push(name);
            }
            found = false;
        }

        let unableToRemoveString = "";
        console.log(unableToRemove);
        if(unableToRemove.length > 0){
            unableToRemoveString = unableToRemove.join(", ");
        }

        try{

            if(removedPlayers.length > 0){
                const playerLogChannel = interaction.client.channels.cache.get("1437279237370548234");
                let playersgeneratedString = removedPlayersString.join("\n");
                playerLogChannel.send("``` ``` \n" + Date() + " - **Player Bulk Removal Command** Team (" + team.mTeamName +  "), Removed by "+ commandUsername +", In Channel: " +  interaction.channel.name + " - Players Removed:\n"+ playersgeneratedString);
                
                if(removedPlayers.length == names.length){
                    return interaction.reply(`The following players were removed from the team ${team.mTeamName}:\n${playersgeneratedString}`);
                }
                else{
                    return interaction.reply(`The following players were removed from the team ${team.mTeamName}:\n${playersgeneratedString}\nUnable to remove the following players: ${unableToRemoveString}`);
                }
            }
        }
        catch(err){
            console.error(err);
        }

        return interaction.reply('Unable to remove the player with name ' + unableToRemoveString + ' from your team,');
    },
};