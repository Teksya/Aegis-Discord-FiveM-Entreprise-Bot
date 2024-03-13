
const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ModalBuilder, TextInputStyle, TextInputBuilder, EmbedBuilder } = require("discord.js")
const discordTranscripts = require('discord-html-transcripts');
const request = require('request')

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }



module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (!interaction.isButton()) return;


       
        if (interaction.customId === 'close_ticket') {

            const attachment = await discordTranscripts.createTranscript(interaction.channel,{

                returnType: 'string',
                poweredBy: false
              })

              const id = makeid(30)
              

              const options = {
                url: 'http://195.14.105.55:30101/sendticket.php',
                form: {
                  name: id,
                  photo: attachment
                }
              }

              request.post(options, (err, res, body) => {
                if (err) {
                  return console.log(err)
                }
              })


            const channels = interaction.member.guild.channels.cache.find(chan => chan.id === client.config.tickettrans);
            
            const ticketeembed = new EmbedBuilder()
            .setColor("Red")
            .setTitle('Transcript ticket')
            .setDescription(`Voici le transcript du ticket : ${interaction.channel.name} \n [Clique ici](http://195.14.105.55:30101/viewticket.php?id=${id})`)
            .setTimestamp()
            .setFooter(client.config.footer);


            channels.send({
            embeds : [ticketeembed],
            });


            const accept = new EmbedBuilder()
            .setColor("Red")
            .setTitle(`Fermeture du ticket`)
            .setDescription(`Votre ticket est fermé voici le transcript : [Cliquez ici](http://195.14.105.55:30101/viewticket.php?id=${id})`)
            .setTimestamp()
            .setFooter(client.config.footer);


            const usé = await client.db.get(`tickete_${interaction.channel.id}`)
            client.users.fetch(usé, false).then((user) => {
                user.send({ embeds: [accept] });
            });

            interaction.channel.delete()


        }
    }
}