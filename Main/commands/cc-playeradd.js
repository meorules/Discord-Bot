const { SlashCommandBuilder } = require('discord.js');

const Player = require('../modules/Player.js');
const Team = require('../modules/team.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('player-add')
        .setDescription('Add players to your team, make sure to check the sheet carefully for the IDs')
        .addStringOption(option => option.setName('id').setDescription('ID of the player you want to add.').setRequired(true))
        .addUserOption((option) =>
            option
            .setName("username")
            .setRequired(false)
            .setDescription("Username to add player to (if not yourself)"),
        ),
    async execute(interaction) {
        let id = interaction.options.getString("id");
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
        playerToAdd = await Player.RetrievePlayerByID(id);
        if(playerToAdd){
            let changes = await Team.AddPlayers(team.mID,[playerToAdd]);
            if(changes > 0 ){
                try{
                    const playerLogChannel = interaction.client.channels.cache.get("1437279237370548234");
                    let playersgeneratedString = await playerToAdd.stringify();
                    playerLogChannel.send("``` ``` \n" + Date() + " - **Player Add Command** Team (" + team.mTeamName +  "), Added by "+ commandUsername +", In Channel: " +  interaction.channel.name + " - Player Added:\n"+ playersgeneratedString);
                }
                catch(err){
                    console.error(err);
                }

                return interaction.followUp(`The following player was added to the team ${team.mTeamName}:\n ${await playerToAdd.stringify()}`);
            }
        }

        return interaction.followUp('Unable to add the player with id ' + id + ' to your team.');
    },
};