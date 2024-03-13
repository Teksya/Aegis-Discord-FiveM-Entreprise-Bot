const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ModalBuilder, TextInputStyle, TextInputBuilder, EmbedBuilder } = require("discord.js")
const discordTranscripts = require('discord-html-transcripts');

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (!interaction.isButton()) return;


       
        if (interaction.customId === 'candidature_famille') {
            const modal = new ModalBuilder()
                .setCustomId('candid')
                .setTitle('Menu Candidature')
                .addComponents(
                    new ActionRowBuilder().addComponents(
                        new TextInputBuilder()
                        .setCustomId('exp')
                        .setLabel('Vôtre expérience !')
                        .setMaxLength(50)
                        .setPlaceholder('')
                        .setStyle(TextInputStyle.Paragraph)
                    ))
                .addComponents(
                    new ActionRowBuilder().addComponents(
                        new TextInputBuilder()
                        .setCustomId('motivations')
                        .setLabel('Vos Motivations')
                        .setMaxLength(50)
                        .setPlaceholder('Notez vos motivations!')
                        .setStyle(TextInputStyle.Paragraph)
                    ))
                .addComponents(
                    new ActionRowBuilder().addComponents(
                        new TextInputBuilder()
                        .setCustomId('pourquoiv')
                        .setLabel(`Pourquoi vous et pas un autre?`)
                        .setMaxLength(500)
                        .setPlaceholder('Notez vos motivations.')
                        .setStyle(TextInputStyle.Paragraph)
                    ))
                .addComponents(
                    new ActionRowBuilder().addComponents(
                        new TextInputBuilder()
                        .setCustomId('histoire')
                        .setLabel(`Histoire RP.`)
                        .setMaxLength(300)
                        .setPlaceholder('Notez vôtre histoire RP en bref.')
                        .setStyle(TextInputStyle.Paragraph)
                    ))
                .addComponents(
                    new ActionRowBuilder().addComponents(
                        new TextInputBuilder()
                        .setCustomId('infoirl')
                        .setLabel(`Informations IRL.`)
                        .setMaxLength(100)
                        .setPlaceholder(`Notez Prénom + Äge.`)
                        .setStyle(TextInputStyle.Paragraph)
                    ))
            await interaction.showModal(modal);
        }


        if (interaction.customId === 'accept') {

            if (!interaction.member.roles.cache.find(role => role.id == client.config.role_support)) {

                interaction.reply({ content: "Non", ephemeral: true })
                return
            }
            const channel = interaction.channel;
            const accept = new EmbedBuilder()
                .setColor('Green')
                .setTitle(`Decision du recrutement`)
                .setDescription(`Vous êtes accepté(e) ! vous allez reçevoir les accès une fois le ticket fermé. Felicitations !`)
                .setTimestamp()
                .setFooter(client.config.footer);

                const rows = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('acceptt')
                    .setLabel("Terminer")
                    .setStyle(ButtonStyle.Success)
                )
            await interaction.channel.send({ embeds: [accept], components: [rows]})
            
            const channels = interaction.member.guild.channels.cache.find(chan => chan.id === client.config.transcriptchan);
            const attachment = await discordTranscripts.createTranscript(channels, { poweredBy: false });
            channels.send({
                content: `Recrutement acceptée par ${interaction.member.nickname}`,
                files: [attachment],
            });
            // interaction.channel.delete()
        }

        if (interaction.customId === 'deny') {
            if (!interaction.member.roles.cache.find(role => role.id == client.config.role_support)) {z
                interaction.reply({ content: "Non", ephemeral: true })
                return
            }

            const modal = new ModalBuilder()
                .setCustomId('deny')
                .setTitle('Refus du recrutement')
                .addComponents(
                    new ActionRowBuilder().addComponents(
                        new TextInputBuilder()
                        .setCustomId('raisonrefus')
                        .setLabel('Raison du refus.')
                        .setMaxLength(200)
                        .setMinLength(0)
                        .setPlaceholder('!')
                        .setStyle(TextInputStyle.Short)
                    ))
            await interaction.showModal(modal);
        }

        if (interaction.customId === 'acceptt') {

            if (!interaction.member.roles.cache.find(role => role.id == client.config.role_support)) {

                interaction.reply({ content: "Non", ephemeral: true })
                return
            }
            await interaction.channel.send({content: "truc"})
            
            const channels = interaction.member.guild.channels.cache.find(chan => chan.id === client.config.transcriptchan);
            const attachment = await discordTranscripts.createTranscript(channels, { poweredBy: false });
            channels.send({
                content: `Recrutement acceptée par ${interaction.member.nickname}`,
                files: [attachment],
            });
            // interaction.channel.delete()
        }
    }
}