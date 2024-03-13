const { ChannelType, PermissionsBitField, EmbedBuilder, ActionRow, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")
const discordTranscripts = require('discord-html-transcripts');


module.exports = {

        name: 'interactionCreate',
        async execute(interaction, client) {


            if (!interaction.isModalSubmit()) return;
                //Refus 
                if (interaction.customId === 'deny') {
                    const channel = interaction.channel;
                    const denymes = interaction.fields.getTextInputValue('raisonrefus')

                    const accept = new EmbedBuilder()
                        .setColor("Red")
                        .setTitle(`Decision du recrutement`)
                        .setDescription(`Vous êtes refuser par <@${interaction.member.id}> Raison : ${denymes}`)
                        .setTimestamp()
                        .setFooter(client.config.footer);

                    await interaction.reply({ embeds: [accept] })

                    const attachment = await discordTranscripts.createTranscript(channel, { poweredBy: false });

                    const channels = interaction.member.guild.channels.cache.find(chan => chan.id === client.config.transcriptchan);
                    channels.send({
                        content: `Recrutement refusé par ${interaction.member.nickname}`,
                        files: [attachment],
                    });

                    const usé = await client.db.get(`ticket_${interaction.channel.id}`)
                    client.users.fetch(usé, false).then((user) => {
                        user.send({ embeds: [accept] });
                    });

                    interaction.channel.delete()
                }


               
        
                    // Candid : Salon Nouveau
                    if (interaction.customId === 'candid') {
                    interaction.guild.channels.create({
                            name: `Recrutement-${interaction.member.nickname}`,
                            parent: client.config.categcandid,
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
                                client.db.set(`ticket_${c.id}`, interaction.user.id)


                                // Candid : Accept/Refus et modal
                                const epxe = interaction.fields.getTextInputValue('exp')
                                const motiva = interaction.fields.getTextInputValue('motivations')
                                const pourquoivo = interaction.fields.getTextInputValue('pourquoiv')
                                const hist = interaction.fields.getTextInputValue('histoire')
                                const inf = interaction.fields.getTextInputValue('infoirl')


                                interaction.reply({
                                    content: `Recrutement envoyé ! ! <#${c.id}>`,
                                    components: [],
                                    ephemeral: true
                                });

                                const row = new ActionRowBuilder()
                                    .addComponents(
                                    new SelectMenuBuilder()
                                    .setCustomId('aviss')
                                    .setPlaceholder('Sélectionnez les avis')
                                    .addOptions(client.config.aviss)
                                    .setMaxValues(Object.keys(client.config.aviss).length / 2)
                                    .setMinValues(Object.keys(client.config.aviss).length / 2)
                                 )
                                const rows = new ActionRowBuilder()
                                    .addComponents(
                                        new ButtonBuilder()
                                        .setCustomId('accept')
                                        .setLabel("Accepter")
                                        .setStyle(ButtonStyle.Success)
                                    )
                                    .addComponents(
                                        new ButtonBuilder()
                                        .setCustomId('deny')
                                        .setLabel("Refuser")
                                        .setStyle(ButtonStyle.Danger)
                                    )
                             

                                // Recrutement Embed
                                const recrut = new EmbedBuilder()
                                    .setColor("#2f3136")
                                    .setTitle(`Recrutement de ${interaction.member.nickname}`)
                                    .setDescription('Chaque membre postera son avis sous votre candidature.')
                                    .addFields([{
                name: "Nom I-G: ",
                value: `<@${interaction.member.id}>`
                },
                {
                    name: "Expérience: ",
                    value: `${epxe}`
                },
                {
                    name: "Motivations: ",
                    value: `${motiva}`
                },
                {
                    name: "Pourquoi vous: ",
                    value: `${pourquoivo}`
                },
                {
                    name: "Histoire RolePlay: ",
                    value: `${hist}`
                },
                {
                    name: "Prénom et âge IRL: ",
                    value: `${inf}`
                },
            ])
            .setTimestamp()
            .setFooter(client.config.footer);

                c.send({content: "@everyone", embeds:[recrut],components:[row,rows]})
                 })}
}}
