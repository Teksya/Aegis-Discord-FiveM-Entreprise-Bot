const { ChannelType, PermissionsBitField, EmbedBuilder, ActionRow, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")


module.exports = {

        name: 'interactionCreate',
        async execute(interaction, client) {


            if (!interaction.isModalSubmit()) return;

                    if (interaction.customId === 'verif') {
            
                        if (interaction.fields.getTextInputValue('captcha') !== client.cap[interaction.user.id] )  return interaction.reply({ content: `:x:  | Captcha invalide !`,ephemeral: true });
                        const name = interaction.fields.getTextInputValue('name')
                        client.db.set(`name_${interaction.user.id}`,name) 
                        ////////////////////////////////////////////////
                        interaction.reply({ content: `Vous êtes désormais vérifié!`,ephemeral:true });
                        var role= interaction.member.guild.roles.cache.find(role => role.id === client.config.role_membre);
                        interaction.member.roles.add(role)
                        interaction.member.setNickname(name,"pseudo rp")
                    }
}}
