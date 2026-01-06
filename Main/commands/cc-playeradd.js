const { SlashCommandBuilder } = require('discord.js');

const Player = require('../modules/Player.js');
const Team = require('../modules/team.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('player-add')
        .setDescription('Add players to your team, make sure to check the sheet carefully for the IDs')
        .addStringOption(option => option.setName('ids').setDescription('ID of the player you want to add.').setRequired(false))
        .addStringOption(option => option.setName('names').setDescription('Name of the player you want to add.').setRequired(false))
        .addUserOption((option) =>
            option
            .setName("username")
            .setRequired(false)
            .setDescription("Username to add player to (if not yourself)"),
        ),
    async execute(interaction) {
        let ids = interaction.options.getString("ids") ? interaction.options.getString("ids").split(",") : [];
        let names = interaction.options.getString("names") ? interaction.options.getString("names").split(",") : [];

        let players = [];

        for(let id of ids){
            let player = await Player.RetrievePlayerByID(id.trim());
            if(player){
                players.push(player);
            }
        }
        for(let name of names){
            let playersByName = await Player.RetrievePlayersByName(name.trim());
            if(playersByName.length == 1){
                players.push(...playersByName);
            }
            else{
                return interaction.followUp("Multiple players found with the name " + name + ". Please use IDs to add specific players.");
            }
        }        
        let commandUsername = interaction.user.username;
        let retrievedUsername = interaction.options.getUser("username");
        let username = "";

        if(retrievedUsername){

            username = retrievedUsername.username;
        }
        else{
            username = commandUsername;
        }

        team = await Team.RetrieveTeamByUser(username);
        if(players.length > 0){
            let changes = await Team.AddPlayers(team.mID,players);
            if(changes > 0 ){
                let playersgeneratedString = "";
                try{
                    const playerLogChannel = interaction.client.channels.cache.get("1437279237370548234");
                    for(let playerToAdd of players){
                        playersgeneratedString += await playerToAdd.stringify() + "\n";
                    }
                    playerLogChannel.send("``` ``` \n" + Date() + " - **Player Add Command** Team (" + team.mTeamName +  "), Added by "+ commandUsername +", In Channel: " +  interaction.channel.name + " - Player Added:\n"+ playersgeneratedString);
                }
                catch(err){
                    console.error(err);
                }

                return interaction.followUp(`The following players were added to the team ${team.mTeamName}:\n ${playersgeneratedString}`);
            }
        }

        return interaction.followUp('Unable to add the player with id ' + ids + ' or name ' + names + ' to your team.');
    },
};