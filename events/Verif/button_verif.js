const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ModalBuilder, TextInputStyle, TextInputBuilder, EmbedBuilder } = require("discord.js")
const discordTranscripts = require('discord-html-transcripts');

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (!interaction.isButton()) return;

        // Verif 
        if (interaction.customId === 'verif') {
            const calcule = await client.config.calcul[getRandomInt(client.config.calcul.length)]
            client.cap[interaction.user.id] = calcule.q
            const modal = new ModalBuilder()
                .setCustomId('verif')
                .setTitle('Vérification')
                .addComponents(
                    new ActionRowBuilder().addComponents(
                        new TextInputBuilder()
                        .setCustomId('name')
                        .setLabel('Nom RP')
                        .setMaxLength(32)
                        .setMinLength(4)
                        .setPlaceholder('Entrer le nom RP!')
                        .setStyle(TextInputStyle.Short)
                    ))
                .addComponents(
                    new ActionRowBuilder().addComponents(
                        new TextInputBuilder()
                        .setCustomId('captcha')
                        .setLabel(calcule.name)
                        .setMaxLength(4)
                        .setMinLength(1)
                        .setStyle(TextInputStyle.Short)
                    ))
            await interaction.showModal(modal);
        }
}}