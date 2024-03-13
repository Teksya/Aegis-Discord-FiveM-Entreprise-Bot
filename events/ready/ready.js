const { Client, GatewayIntentBits, ActivityType, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'ready',
  async execute(interaction, client) {
    console.log('Le bot est en ligne !');
    client.user.setPresence({
      activities: [{ name: `la version ${client.config.version}`, type: ActivityType.Watching }],
      status: 'dnd',
    });

    const channel = client.channels.cache.get('1162745418233421854');
    const status = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('Bot UP !')
      .setDescription(`Le bot est en ligne !\nVersion : ${client.config.version}\nPing : ${client.ws.ping}`)
      .setFooter(client.config.footer);
    channel.send({ embeds: [status] });
  }
};