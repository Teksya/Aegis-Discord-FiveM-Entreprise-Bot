const { ContextMenuCommandBuilder, ApplicationCommandType, ButtonBuilder, ButtonStyle, ActionRowBuilder, ModalBuilder, TextInputStyle, TextInputBuilder, EmbedBuilder } = require("discord.js")


module.exports = {
    name: 'interactionCreate',
    async execute(interaction,) {


        
if (!interaction.isUserContextMenuCommand()) return;
// Get the User's username from context menu
const { username } = interaction.targetUser;
console.log(username);
}}