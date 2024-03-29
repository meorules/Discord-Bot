const { SlashCommandBuilder, roleMention, Role, RoleManager } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setupevent')
        .setDescription('Setup an event with reactions'),
    async execute(interaction) {
        const r = await interaction.guild.roles.fetch("1170427348869447741");
        messageString = `${r} \n React for event \n :newspaper: Scattegories \n :paintbrush: Regular Skribbl \n :soccer: Club Skribbl \n :map: Geoguesser \n :gun: Warzone \n:green_square: Tic-Tac-Toe \n :red_circle: Connect-4 \n :snake: Curve \n :laughing: Meme \n :money_with_wings: Monopoly \n :question: Codenames \n :hamster: Hax \n :garlic: Gartic \n :black_joker: Cards Against Humanity \n   :golf: Putt Party \n :sushi: Amongus \n :detective: Mafia \n :bat: Unknown \n :race_car: Super Karts \n :robot: Roblox`;
        const message = await interaction.channel.send({ content: messageString, fetchReply: true });
        interaction.reply("Setting up Event Menu and Tagged Manager Role");
        Promise.all([
                message.react('📰'),
                message.react('🖌'),
                message.react('⚽'),
                message.react('🗺'),
                message.react('🔫'),
                message.react('🟩'),
                message.react('🔴'),
                message.react('🐍'),
                message.react('😆'),
                message.react('💸'),
                message.react('❓'),
                message.react('🐹'),
                message.react('🧄'),
                message.react('🃏'),
                message.react('⛳'),
                message.react('🍣'),
                message.react('🕵'),
                message.react('🦇'),
                message.react('🏎'),
                message.react('🤖')
            ])
            .catch(error => console.error('One of the emojis failed to react:', error));

    },
};