const { SlashCommandBuilder } = require('discord.js');

const Player = require('../modules/Player.js');
const Team = require('../modules/team.js');
const fs = require('node:fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('money-add')
        .setDescription('Add money to yourself or other users')
        .addIntegerOption((option) =>
            option
            .setName("amount")
            .setRequired(true)
            .setDescription("Amount to add"),
        )
        .addUserOption((option) =>
            option
            .setName("username")
            .setRequired(false)
            .setDescription("Username to add money to (if not yourself)"),
        ),
    async execute(interaction) {
        let commandUsername = interaction.user.username;
        let retrievedUsername = interaction.options.getUser("username");
        let amount = interaction.options.getInteger("amount");
        let username = "";

        if(retrievedUsername){

            username = retrievedUsername.username;
        }
        else{
            username = commandUsername;
        }

        team = await Team.RetrieveTeamByUser(username);
        team.updateBalance(amount);

        try {
            const content = Date() + " - Money Add: Team(" + team.mTeamName +  ") Amount(" + amount + ") Added by (" + commandUsername + ")  - New Balance ("+ team.mBalance +") \n";
            fs.appendFileSync('Main/Log/moneyLog.txt', content);

            const channel = interaction.client.channels.cache.get("1436903358870061212");
            channel.send(Date() + " - **Money Add:** Team (" + team.mTeamName +  ") \nAmount (" + amount + ") Added by (" + commandUsername + ")  \nNew Balance ("+ team.mBalance +") \n");
        // file written successfully
        } catch (err) {
            console.error(err);
        }
        //console.log(team)
        generatedString = "Amount added: " + amount + " \n";
        generatedString = generatedString + team.stringify(false,true);

        return interaction.reply(generatedString);
    },
};