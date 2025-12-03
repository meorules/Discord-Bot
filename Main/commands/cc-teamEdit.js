const { SlashCommandBuilder } = require('discord.js');

const Player = require('../modules/Player.js');
const Team = require('../modules/team.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('team-edit')
        .setDescription('Edit your team settings')
        .addStringOption(
            option => option
            .setName('setting')
            .setDescription('The setting you want to edit')
            .setChoices({ name: "Team Name", value: "Team Name" },{ name: "Primary Emoji", value: "Primary Emoji" },{ name: "Secondary Emoji", value: "Secondary Emoji" },{ name: "Auto-add packed players", value: "Auto-add packed players" })
            .setRequired(true)
        )
        .addStringOption(option => option.setName('value').setDescription('The new name or emojis, or 0 to disable adding players from packs automatically or 1 to enable it').setRequired(true)),
    async execute(interaction) {
        let setting = interaction.options.getString("setting");
        let value = interaction.options.getString("value");
        let username = interaction.user.username;

        var fieldName = "";
        switch(setting){
            case "Team Name":
                fieldName = "TeamName";
                if(value.length > 35){
                    return interaction.reply(`The team name was not changed, please enter a team name shorter than 36 characters long.`);
                }
                break;
            case "Primary Emoji":
                fieldName = "PrimaryColour";
                break;
            case "Secondary Emoji":
                fieldName = "SecondaryColour";
                break;
            case "Auto-add packed players":
                fieldName = "AutoAddPlayers";
                break;
        }

        let changes = await Team.EditTeam(username,fieldName,value);

        if(changes > 0 ){
            team = await Team.RetrieveTeamByUser(username);

            return interaction.reply(`The team was edited successfully, these are the new details: \n ${team.stringify(true)}`);
        }
        else{
        return interaction.reply('Unable to edit the team settings');
        }
    },
};