const { SlashCommandBuilder } = require('discord.js');

const Player = require('../modules/Player.js');
const Team = require('../modules/team.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('player-remove')
        .setDescription('Remove players from your team')
        .addStringOption(option => option.setName('name').setDescription('Player of the name you own who you want to remove').setRequired(true)),
    async execute(interaction) {
        let name = interaction.options.getString("name");
        let username = interaction.user.username;

        team = await Team.RetrieveTeamByUser(username);

        for(let player in team.mPlayers){
            if(team.mPlayers[player].mPlayerName.includes(name)){
                let changes = await Team.RemovePlayerFromTeamByID(team.mID,team.mPlayers[player].mID);
                if(changes > 0 ){
                    return interaction.reply(`The player ${name} was removed from your team.`);
                }
            }
        }


        return interaction.reply('Unable to remove the player with name ' + name + ' from your team,');
    },
};