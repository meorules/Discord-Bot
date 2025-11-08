const { SlashCommandBuilder, roleMention, Role, RoleManager } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setupevent')
        .setDescription('Setup an event with reactions'),
    async execute(interaction) {
        const r = await interaction.guild.roles.fetch("1261679081255206914");
        messageString = `${r} \n React for event \n :newspaper: Scattegories \n :paintbrush: Skribbl \n :map: Geoguesser \n :gun: Warzone \n:green_square: Bingo \n :snake: Curve \n :laughing: Meme \n :money_with_wings: Monopoly \n :question: Codenames \n :garlic: Gartic \n :black_joker: Cards Against Humanity \n   :golf: Putt Party \n :sushi: Amongus \n :detective: Mafia \n :bat: Unknown \n :race_car: Smash Karts \n :robot: Roblox \n :slot_machine: Poker \n :hamster: Hax`;
        const message = await interaction.channel.send({ content: messageString, fetchReply: true });
        interaction.reply("Setting up Event Menu and Tagged Manager Role");
        Promise.all([
                message.react('📰'),
                message.react('🖌'),
                message.react('🗺'),
                message.react('🔫'),
                message.react('🟩'),
                message.react('🐍'),
                message.react('😆'),
                message.react('💸'),
                message.react('❓'),
                message.react('🧄'),
                message.react('🃏'),
                message.react('⛳'),
                message.react('🍣'),
                message.react('🕵'),
                message.react('🦇'),
                message.react('🏎'),
                message.react('🤖'),
                message.react('🎰'),
                message.react('🐹')
            
            ])
            .catch(error => console.error('One of the emojis failed to react:', error));

    },
};