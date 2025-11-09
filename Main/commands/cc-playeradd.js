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
                return interaction.reply(`The player ${playerToAdd.mPlayerName} was added to the team ${team.mTeamName}.`);
            }
        }

        return interaction.reply('Unable to add the player with id ' + id + ' to your team.');
    },
};