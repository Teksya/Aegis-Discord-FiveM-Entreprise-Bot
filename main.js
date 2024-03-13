const Discord = require("discord.js");
const { Client, GatewayIntentBits, Permissions, PermissionFlagsBits, ChannelType, ActionRowBuilder, TextInputStyle, SelectMenuBuilder, TextInputBuilder, ActivityType, ModalBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, REST, Routes, Collection, WebhookClient } = require('discord.js');
const { QuickDB } = require("quick.db");
const fs = require('fs');
const token = require("./token");
const config = require("./config.json");

const bot = new Client({ 
    intents: [32767, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildPresences ],
  });
const rest = new Discord.REST({ version: '10' }).setToken(token.token);
const commands = [];
const contextmenus = [];
const contextmenuList = new Collection();
const commandList = new Collection();

bot.db = new QuickDB();
bot.cap = [];
bot.config = config;

bot.login(token.token);

// Command handler
fs.readdirSync('./commands').filter(file => file.endsWith('.js')).forEach(file => {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
    commandList.set(command.data.name, command.execute);
    console.log(`Commande : ${file} chargée avec succès!`);
});


// contextmenu handler
fs.readdirSync('./contextmenu').filter(file => file.endsWith('.js')).forEach(file => {
    const contextmenu = require(`./contextmenu/${file}`);
    contextmenus.push(contextmenu.data.toJSON());
    contextmenuList.set(contextmenu.data.name, contextmenu.execute);
    console.log(`Contextmenu : ${file} chargée avec succès!`);
});
(async () => {
    try {
        await rest.put(
            Discord.Routes.applicationCommands(config.clientid), { body: commands },
            Discord.Routes.applicationCommands(config.clientid), { body: contextmenus }
        );
        console.log(`Commandes enregistrées avec succès!`);
        console.log(`ContextMenus enregistrées avec succès!`);
       
    } catch (error) {
        console.error(`Erreur lors de l'enregistrement des commandes : ${error}`);
    }
})();

// Event handler
console.log(`Le bot est en train de démarrer...`);
console.log(`------------------------------------------------------------------------`);

const eventsFolders = fs.readdirSync('./events');

for (const folder of eventsFolders) {
    const eventFiles = fs.readdirSync(`./events/${folder}`).filter((file) => file.endsWith('.js'));

    for (const file of eventFiles) {
        const event = require(`./events/${folder}/${file}`);
        bot.on(event.name, (...args) => event.execute(...args, bot));
        console.log(`${folder} : ${file} chargé avec succès!`);
    }
}

// Interaction (Slash command) handler
bot.on("interactionCreate", async interaction => {
    if (interaction.isUserContextMenuCommand()){


        
    const contextmenuee = contextmenuList.get(interaction.commandName);
    if (!contextmenuee) {
        console.error(`Mauvais contextmenu`);
        return;
    }

    try {
        await contextmenuee(interaction, bot);
    } catch (error) {
        console.error(`Erreur lors de l'exécution de ${interaction.commandName}:`);
        console.error(error);
    }


        return
    } 



    if (!interaction.isCommand()) return;

    const command = commandList.get(interaction.commandName);
    if (!command) {
        console.error(`Mauvaise commande`);
        return;
    }

    try {
        await command(interaction, bot);
    } catch (error) {
        console.error(`Erreur lors de l'exécution de ${interaction.commandName}:`);
        console.error(error);
    }
});

// Handle unhandled rejections
process.on('unhandledRejection', async (err, promise) => {
    console.error(`[ANTI-CRASH] Une erreur est survenue : ${err}`);
    console.error(promise);
});
