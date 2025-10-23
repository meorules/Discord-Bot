const fs = require('node:fs');
const path = require('node:path');
//const keepAlive = require("./server.js")
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const config = require("./config.json");

const prefix = "!"
const logFilePath = path.join(__dirname,"Main/log.txt")

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
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


client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});


client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    try {
        fs.writeFileSync(logFilePath, "Username: " + interaction.user.username + ",", { flag: 'a+' });
        fs.writeFileSync(logFilePath, "Command Used: " + interaction.commandName + ",", { flag: 'a+' });
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

});


///keepAlive()

client.login(config.BOT_TOKEN);