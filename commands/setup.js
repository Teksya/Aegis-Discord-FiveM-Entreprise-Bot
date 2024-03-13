const { SlashCommandBuilder, PermissionFlagsBits, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder, SelectMenuBuilder } = require("discord.js")



module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Met en place le système de tickets')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Le salon ou serra envoyé le système')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('category')
                .setDescription('La catégorie que vous voulez mettre en place.')
                .setRequired(true)
                .addChoices(
                    { name: 'Ticket', value: 'ticket_config' },
                    { name: 'Vérification', value: 'verification_config' },
                    { name: 'Status entreprise', value: 'statentre_config' },
                )),
    async execute(interaction, client) {
        const channel = interaction.options.get('channel');
        const category = interaction.options.get('category');


        interaction.reply({ content: "Votre demande a été traitée", ephemeral: true })

        switch (category.value) {
            case 'ticket_config':
                const row1 = new ActionRowBuilder()
                    .addComponents(
                        new SelectMenuBuilder()
                            .setCustomId('raisontick')
                            .setPlaceholder('Déroulez moi !')
                            .addOptions(client.config.ticket)
                        // .setMaxValues(Object.keys(client.config.ticket).length/2)
                        // .setMinValues(Object.keys(client.config.ticket).length/2)
                    );

                const ticketembed = new EmbedBuilder()
                    .setColor("#2f3136")
                    .setTitle('Ticket')
                    .setDescription("Cliquez sur le menu déroulant ci-dessous afin d'ouvrir un ticket.")
                    .setThumbnail('https://distok.top/stickers/776239539974963202/776242536820899861.gif')
                    .setTimestamp()
                    .setFooter({ text: client.config.footer.text + client.config.version});

                channel.channel.send({ embeds: [ticketembed], components: [row1] })
                break;


            case 'verification_config':
                const row2 = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('verif')
                            .setLabel('Se verifier')
                            .setStyle(ButtonStyle.Success),
                    );


                const verifembed = new EmbedBuilder()
                    .setColor("#2f3136")
                    .setTitle('Vérification')
                    .setDescription('Pour commencer vôtre aventure veuillez **cliquer sur le bouton ci-dessous!**')
                    .setThumbnail('https://distok.top/stickers/754103543786504244/754108691493683221.gif')
                    .setTimestamp()
                    .setFooter(client.config.footer);

                channel.channel.send({ embeds: [verifembed], components: [row2] })
                break;


            case 'statentre_config':
                const row3 = new ActionRowBuilder()
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


                const verifembed1 = new EmbedBuilder()
                    .setColor("#2f3136")
                    .setTitle('Status du CNN')
                    .setDescription('Pour ouvrir ou fermer le CNN, Appuyez sur les boutons ci dessous !\nPrenez note que vous pouvez utiliser le bouton toutes les 10 minutes.')
                    .setTimestamp()
                    .setFooter(client.config.footer);

                channel.channel.send({ embeds: [verifembed1], components: [row3] })
                break;



        }
    },
};