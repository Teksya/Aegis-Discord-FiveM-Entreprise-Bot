
const {EmbedBuilder, ChannelType,ActionRowBuilder,ButtonStyle,SelectMenuBuilder,ButtonBuilder,PermissionsBitField} = require("discord.js")
module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (!interaction.isSelectMenu()) return;

        //Avis Recrutement
        if (interaction.customId === 'raisontick') {

            let ticket = "bannane"
            


            client.config.ticket.forEach(element => {
               if (element.value === interaction.values[0]){
                    ticket = element
                    return
                }
          
            });



            interaction.guild.channels.create({
                name: `ticket-${interaction.member.nickname}`,
                parent: client.config.ticketcat,
                type: ChannelType.GuildText,
                permissionOverwrites: [{
                        id: interaction.user.id,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory],
                    },
                    {
                        id: client.config.role_support,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory],
                    },
                    {
                        id: interaction.guild.id,
                        deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory],
                    },
                ]
            }).then(async c => {
                    client.db.set(`tickete_${c.id}`, interaction.user.id)

                    await interaction.deferUpdate();
                   
                    await interaction.editReply({ components: [] });

                    const row = new ActionRowBuilder()
                    .addComponents(
                        new SelectMenuBuilder()
                            .setCustomId('raisontick')
                            .setPlaceholder('Déroulez moi !')
                            .addOptions(client.config.ticket)
                            // .setMaxValues(Object.keys(client.config.ticket).length/2)
                            // .setMinValues(Object.keys(client.config.ticket).length/2)
                    );
                     await interaction.editReply({ components: [row] });


                     const close = new ActionRowBuilder()
                     .addComponents(
                         new ButtonBuilder()
                             .setCustomId('close_ticket')
                             .setLabel('Fermer le ticket')
                             .setStyle(ButtonStyle.Danger),
                     );


                    const ticketeembed = new EmbedBuilder()
                    .setColor("Red")
                    .setTitle('Ticket')
                    .setDescription('Nôtre équipe arrivera sous peu!')
                    .addFields(
                        { name: 'Raison', value:ticket.label },
                        { name: 'Description', value:ticket.description }
                    )
                    .setTimestamp()
                    .setFooter(client.config.footer);
            
            
                     c.send({ embeds: [ticketeembed],components : [close]});
            })






        }
    }
}