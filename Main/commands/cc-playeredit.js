const { SlashCommandBuilder } = require('discord.js');

const Player = require('../modules/Player.js');
const Team = require('../modules/team.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('player-edit')
        .setDescription('Edit your player upgrades')
        .addIntegerOption(
            option => option
            .setName('upgrade')
            .setDescription('The rating upgrade or downgrade')
            .setRequired(true)
        )
        .addStringOption(option => option.setName('name').setDescription('Player of the name you own who you want to upgrade').setRequired(true)),
    async execute(interaction) {
        let upgrade = interaction.options.getInteger("upgrade");
        let name = interaction.options.getString("name");
        let username = interaction.user.username;

        team = await Team.RetrieveTeamByUser(username);
        let player = await Team.EditPlayerUpgrade(team.mID,name,upgrade);

        if(player){
            return interaction.reply(`The player was edited succesfully in your team, these are the new details: \n ${await player.stringify()}`);
        }
        return interaction.reply('Unable to edit the player upgrade for ' + name);
    },
};