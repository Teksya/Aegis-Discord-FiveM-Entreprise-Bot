const { SlashCommandBuilder, ContextMenuCommandBuilder, ApplicationCommandType, ButtonStyle, ActionRowBuilder, EmbedBuilder, SelectMenuBuilder } = require("discord.js")



module.exports = {
    data: new ContextMenuCommandBuilder()
	.setName('User Information')
	.setType(ApplicationCommandType.User),
    async execute(interaction, client) {
        



     
    },
};