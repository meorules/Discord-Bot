const { SlashCommandBuilder } = require('discord.js');

const Player = require('../modules/Player.js');
const Team = require('../modules/team.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('player-edit')
        .setDescription('Edit your player upgrades')
        .addStringOption(
            option => option.setName('name')
            .setDescription('Player of the name you own who you want to upgrade')
            .setRequired(true)
        )
        .addIntegerOption(
            option => option
            .setName('upgrade')
            .setDescription('The rating upgrade or downgrade')
            .setRequired(false)
        )
        .addStringOption(
            option => option.setName('position')
            .setDescription('1 to add random adjacent position, 2 to remove all positions, or provide a specific one to be added')
            .setRequired(false)
            .setMaxLength(3)
        )        
,
    async execute(interaction) {
        let upgrade = interaction.options.getInteger("upgrade");
        let name = interaction.options.getString("name");
        let position = interaction.options.getString("position");
        let username = interaction.user.username;
        let player;
        team = await Team.RetrieveTeamByUser(username);
        if(!upgrade && !position){
            return interaction.reply('You must provide at least an upgrade or a position to edit for ' + name);
        }
        if(upgrade){
            player = await Team.EditPlayerUpgrade(team,name,upgrade);
        }
        if(position){
            player = await Team.EditPlayerPosition(team,name,position);
        }

        if(player){
            return interaction.reply(`The player was edited successfully in your team, these are the new details: \n ${await player.stringify()}`);
        }
        return interaction.reply('Unable to edit the player upgrade for ' + name);
    },
};