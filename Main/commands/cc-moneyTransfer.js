const { SlashCommandBuilder } = require('discord.js');

const Player = require('../modules/Player.js');
const Team = require('../modules/team.js');
const fs = require('node:fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pay')
        .setDescription('Remove money from yourself (or someone else) and pay someone else')
        .addIntegerOption((option) =>
            option
            .setName("amount")
            .setRequired(true)
            .setDescription("Amount to pay"),
        )
        .addUserOption((option) =>
            option
            .setName("username-to")
            .setRequired(true)
            .setDescription("Username to add money to"),
        )
        .addUserOption((option) =>
            option
            .setName("username-from")
            .setRequired(false)
            .setDescription("Username to remove money from (if not yourself)"),
        ),
    async execute(interaction) {
        let amount = interaction.options.getInteger("amount");

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

        teamFrom = await Team.RetrieveTeamByUser(username);
        teamFrom.updateBalance(-amount);

        teamTo = await Team.RetrieveTeamByUser(toUsername);
        teamTo.updateBalance(amount);

        try {
            const content = Date() + " - Money Remove: Team(" + teamFrom.mTeamName +  ") Amount(" + amount + ") Removed by (" + username + ")  - New Balance ("+ teamFrom.mBalance +") \n";
            fs.appendFileSync('Main/Log/moneyLog.txt', content);
        // file written successfully
        } catch (err) {
            console.error(err);
        }

        try {
            const content = Date() + " - Money Add: Team(" + teamTo.mTeamName +  ") Amount(" + amount + ") Added by (" + username + ")  - New Balance ("+ teamTo.mBalance +") \n";
            fs.appendFileSync('Main/Log/moneyLog.txt', content);

            const channel = interaction.client.channels.cache.get("1436903358870061212");
            channel.send(Date() + " - **Money Transfer:** From Team (" + teamFrom.mTeamName +  ") - To Team (" + teamTo.mTeamName +  ")\nAmount(" + amount + ") Transfer made by by (" + username + ")  \n Balance of Team From ("+ teamFrom.mBalance +") - Balance of Team To ("+ teamTo.mBalance +")");
        } catch (err) {
            console.error(err);
        }
        //console.log(team)

        generatedString = "Balance updated for both teams:\n" + teamFrom.stringify(false,true) + "\n" + teamTo.stringify(false,true);

        return interaction.reply(generatedString);
    },
};