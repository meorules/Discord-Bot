const { SlashCommandBuilder, UserSelectMenuBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fs = require('node:fs');

const Player = require('../modules/Player.js');
const Team = require('../modules/team.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('money-add-bulk')
        .setDescription('Add money to multiple users at once')
        .addIntegerOption(option =>
            option.setName("amount")
                  .setRequired(true)
                  .setDescription("Amount to add")
        ),
    async execute(interaction) {
        // Check if user has the required role (mod)
        if (!interaction.member.roles.cache.has("1318943571805736975")) {
            return interaction.reply({
                content: "You do not have permission to use this command.",
                ephemeral: true
            });
        }

        const amount = interaction.options.getInteger("amount");
        const commandUserId = interaction.user.id;

        // Create the session for this command
        if (!interaction.client.bulkAddSessions) {
            interaction.client.bulkAddSessions = new Map();
        }

        interaction.client.bulkAddSessions.set(interaction.id, {
            amount,
            commandUserId,
            selectedUserIds: []
        });

        // Build the select menu
        const userSelectMenu = new UserSelectMenuBuilder()
            .setCustomId(`user-menu-${interaction.id}`) // attach session id
            .setPlaceholder('Select up to 10 users')
            .setMinValues(1)
            .setMaxValues(10);

        // Build the confirm button
        const confirmButton = new ButtonBuilder()
            .setCustomId(`confirm-${interaction.id}`)
            .setLabel('Confirm Payments')
            .setStyle(ButtonStyle.Primary);

        // Build rows
        const row1 = new ActionRowBuilder().addComponents(userSelectMenu);
        const row2 = new ActionRowBuilder().addComponents(confirmButton);

        // Send the message
        await interaction.reply({
            content: `Bulk add money: **${amount}**\nSelect the users and confirm:`,
            components: [row1, row2],
            ephemeral: false
        });
    }
};
