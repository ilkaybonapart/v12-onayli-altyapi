const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
let talkedRecently = new Set();

module.exports = message => {
  if (talkedRecently.has(message.author.id)) {
    return;
  }
  talkedRecently.add(message.author.id);
  setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, 2500);
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(ayarlar.prefix)) return;
  let command = message.content.split(" ")[0].slice(ayarlar.prefix.length);
  let params = message.content.split(" ").slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (!client.commands.has(command)) {
    if (client.aliases.has(command)) {
      cmd = client.commands.get(client.aliases.get(command));
    } else {
      if (command == "") return;
      message.reply(`**\`${command}\` Adlı Komutu Bulamadım. <:mx_aglayanordek:914086674873610260>**`);
    }
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
};
