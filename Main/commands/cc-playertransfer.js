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

            username = fromUsername.username;
        }
        else{
            username = commandUsername;
        }

        teamToRemove = await Team.RetrieveTeamByUser(username);
        teamToAdd = await Team.RetrieveTeamByUser(toUsername);

        let changes = await Team.RemovePlayerFromTeam(teamToRemove.mID,name);

        if(changes > 0 ){
            try{
                changes = await Team.AddPlayer(teamToAdd.mID,name);

                if(changes > 0){
                    return interaction.reply(`The player ${name} was removed from ${teamToRemove.mTeamName} and added to ${teamToAdd.mTeamName}`);
                }
            }
            catch(err){
                console.error("Unable to add player, " + err);
                changes = await Team.AddPlayer(teamToRemove.mID,name);
                if(changes > 0 ){
                    return interaction.reply(`Failed to add player to new team, player re-added to original team.`);
                }
                else{
                    return interaction.reply(`Operation failed mid-way, please inform Meo.`);
                }
            }
        }


        return interaction.reply('Unable to complete player transfer.');
    },
};