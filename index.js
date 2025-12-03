const fs = require('node:fs');
const path = require('node:path');
require('log-timestamp');

const Team = require('../Discord-Bot/Main/modules/team.js');

//const keepAlive = require("./server.js")
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const config = require("./config.json");

const CardType = require('./Main/modules/cardType.js');



const prefix = "!"
const logFilePath = path.join(__dirname,"Main/log.txt")

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.bulkAddSessions = new Map();
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'Main/commands');

const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}


client.once(Events.ClientReady, async c => {
    cardPrioritySet = await CardType.PopulateCardTypePriority();
    if(cardPrioritySet){
        console.log("Card Priority set");
    }
    else{
        console.error("Card Priority NOT set");
    }
    console.log(`Ready! Logged in as ${c.user.tag}`);
});


client.on(Events.InteractionCreate, async interaction => {
    if (interaction.isChatInputCommand()){

        try {
            fs.writeFileSync(logFilePath, "Username: " + interaction.user.username + ",", { flag: 'a+' });
            fs.writeFileSync(logFilePath, "Command Used: " + interaction.commandName + ",", { flag: 'a+' });
            fs.writeFileSync(logFilePath, "Options passed in" + interaction.options + ",", { flag: 'a+' });
            console.log(interaction.user.username);
            console.log(interaction.commandName);
            console.log(interaction.options);
            for (option in interaction.options._hoistedOptions) {
                fs.writeFileSync(logFilePath, "Option " + interaction.options._hoistedOptions[option].name + ":" + interaction.options._hoistedOptions[option].value + ",", { flag: 'a+' });
            }
            fs.writeFileSync(logFilePath, "\n", { flag: 'a+' });

            // file written successfully
        } catch (err) {
            console.error(err);
        }


        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            await command.execute(interaction);
        } 
        catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    }

    if (interaction.isUserSelectMenu()) {

        // Correct sessionId extraction (no matter how many "-")
        const sessionId = interaction.customId.substring(interaction.customId.lastIndexOf("-") + 1);
        const session = interaction.client.bulkAddSessions.get(sessionId);

        if (!session) {
            await interaction.reply({
                content: "This session has expired.",
                ephemeral: true
            });
            return;
        }

        // Prevent Discord "Interaction failed" message
        await interaction.deferUpdate().catch(() => {});

        // If user clicks OUTSIDE the menu → ignore this interaction
        if (interaction.values.length === 0) return;

        // Save selected users
        session.selectedUserIds = interaction.values;
        interaction.client.bulkAddSessions.set(sessionId, session);

        await interaction.followUp({
            content: `Selected **${session.selectedUserIds.length}** user(s).`,
            ephemeral: true
        });

        return;
    }


    if (interaction.isButton()) {

        // Extract session ID from button customId
        const sessionId = interaction.customId.substring(interaction.customId.lastIndexOf("-") + 1);
        const session = interaction.client.bulkAddSessions.get(sessionId);

        if (!session) {
            return interaction.reply({
                content: "This session has expired.",
                ephemeral: true
            });
        }

        // Ensure the SAME moderator is clicking the confirmation button
        if (interaction.user.id !== session.commandUserId) {
            return interaction.reply({
                content: "You cannot confirm another moderator's bulk action.",
                ephemeral: true
            });
        }

        // Ensure user selection was made
        if (!session.selectedUserIds || session.selectedUserIds.length === 0) {
            return interaction.reply({
                content: "You did not select any users.",
                ephemeral: true
            });
        }

        // Pull amount from session
        const amount = session.amount;
        const client = interaction.client;

        // Fetch username of mod for logging
        const modUser = client.users.cache.get(session.commandUserId);
        const commandUsername = modUser ? modUser.username : interaction.user.username;

        // Convert user IDs into Discord.js User objects
        let moneyAddedString = "";
        const users = session.selectedUserIds.map(id => client.users.cache.get(id));
        // Process each user
        for (const user of users) {
            const team = await Team.RetrieveTeamByUser(user.username);
            team.updateBalance(amount);
            moneyAddedString += `Added ${amount} to ${team.stringify(false,true)}\n`;

            try {
                // Write to money log file
                const content =
                    `${Date()} - Bulk Money Add: Team(${team.mTeamName}) Amount(${amount}) Added by (${commandUsername}) - New Balance (${team.mBalance})\n`;

                fs.appendFileSync("Main/Log/moneyLog.txt", content);

                // Send staff log message
                const channel = client.channels.cache.get("1436903358870061212");
                await channel.send(
                    "``` ```\n" +
                    `${Date()} - **Bulk Money Add:**\n` +
                    `Team: ${team.mTeamName}\n` +
                    `Amount: ${amount}\n` +
                    `Added by: ${commandUsername}\n` +
                    `New Balance: ${team.mBalance}\n`
                );

            } catch (err) {
                console.error("Logging error:", err);
            }
        }

        interaction.client.bulkAddSessions.delete(sessionId);

        // Delete the select menu message to prevent reuse
        await interaction.message.delete().catch(() => {});

        return interaction.reply({
            content: `Successfully added **${amount}** to **${users.length}** teams.\n Details:\n${moneyAddedString}`,
            ephemeral: false
        });
    }

    return;

});


///keepAlive()

client.login(config.BOT_TOKEN);