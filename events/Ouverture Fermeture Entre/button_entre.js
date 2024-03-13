
const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ModalBuilder, TextInputStyle, TextInputBuilder, EmbedBuilder, Discord } = require("discord.js")





function refreshmessage(interaction,client,isopen) {
    const row = new ActionRowBuilder()
    .addComponents(
    new ButtonBuilder()
        .setCustomId('openentre')
        .setLabel('Ouvrir')
        .setStyle(ButtonStyle.Success),
    new ButtonBuilder()
        .setCustomId('closeentre')
        .setLabel('Fermer')
        .setStyle(ButtonStyle.Danger),
    );


    const verifembed = new EmbedBuilder()
    .setColor("#2f3136")
    .setTitle('Status du CNN')
    .setDescription( `Pour ouvrir ou fermer le CNN, Appuyez sur les boutons ci dessous !\nPrenez note que vous pouvez utiliser le bouton toutes les 10 minutes.\n Derniere ${isopen ? "ouverture" : "fermeture"} par ${interaction.member.nickname}`)
    .setTimestamp()
    .setFooter(client.config.footer);


    interaction.message.edit({ embeds: [verifembed],components:[row]})
}


module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (!interaction.isButton()) return;


        if (interaction.customId === 'openentre') {

            const channels = interaction.member.guild.channels.cache.find(chan => chan.id === client.config.statentrechan);
            channels.setName(client.config.statentreopen)
            interaction.reply({ content: `L'entreprise est désormais affichée comme ouverte!`,ephemeral:true });
            refreshmessage(interaction,client,true) 
        }
		
		if (interaction.customId === 'closeentre') {

            const channels = interaction.member.guild.channels.cache.find(chan => chan.id === client.config.statentrechan);
            channels.setName(client.config.statentreclose)
            interaction.reply({ content: `L'entreprise est désormais affichée comme fermée!`,ephemeral:true });
            refreshmessage(interaction,client) 
        }
    }
}