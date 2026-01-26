const { SlashCommandBuilder } = require('discord.js');

const Player = require('../modules/Player.js');
const Team = require('../modules/team.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('player-remove')
        .setDescription('Remove players from your team')
        .addStringOption(option => option.setName('name').setDescription('Name of the player you want to remove').setRequired(true))
        .addUserOption(option => option.setName('username').setDescription('Username to remove the player from (if not yourself)').setRequired(false)),
    async execute(interaction) {
        let name = interaction.options.getString("name");
        let commandUsername = interaction.user.username;
        let retrievedUsername = interaction.options.getUser("username");
        let username = "";

        if(retrievedUsername){
            if((!interaction.member.roles.cache.has("1318943571805736975") && (retrievedUsername.username != commandUsername ) && !interaction.member.roles.cache.has("1459593499182891038"))){

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

        for(let player in team.mPlayers){
            if(team.mPlayers[player].mPlayerName.toLowerCase().includes(name.toLowerCase().trim())){
                let changes = await Team.RemovePlayerFromTeamByID(team.mID,team.mPlayers[player].mID);
                if(changes > 0 ){
                    try{
                        const playerLogChannel = interaction.client.channels.cache.get("1437279237370548234");
                        let playersgeneratedString = await team.mPlayers[player].stringify();
                        playerLogChannel.send("``` ``` \n" + Date() + " - **Player Removal Command** Team (" + team.mTeamName +  "), Removed by "+ commandUsername +", In Channel: " +  interaction.channel.name + " - Player Removed:\n"+ playersgeneratedString);
                    }
                    catch(err){
                        console.error(err);
                    }
                    return interaction.followUp(`The following player was removed from the team ${team.mTeamName}:\n ${await team.mPlayers[player].stringify()}`);
                }
            }
        }


        return interaction.followUp('Unable to remove the player with name ' + name + ' from your team,');
    },
};