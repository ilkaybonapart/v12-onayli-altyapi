const Discord = require("discord.js");
const db = require("quick.db");
exports.run = function(client, message, args) {
  let botid = args[0];
  let prefix = args[1];
  let onaylımı = args[2];
  let basvuru = db.fetch(`basvuruk_${message.guild.id}`);
  let kanal = db.fetch(`bot-ekle_${message.guild.id}`);
  let log = db.fetch(`bot-log_${message.guild.id}`);
  if (!log)
    return message.channel.send(
      "<a:YanpSnennleGif:819270147834904676> **Bu komudu kullanmak için botlist kanallarının sunucuda ayarlı olması gerekiyor.**"
    );
  if (!basvuru)
    return message.channel.send(
      "<a:YanpSnennleGif:819270147834904676>**Bu komudu kullanmak için botlist kanallarının sunucuda ayarlı olması gerekiyor.**"
    );
  if (!kanal)
    return message.channel.send(
      "<a:YanpSnennleGif:819270147834904676> **Bu komudu kullanmak için botlist kanallarının sunucuda ayarlı olması gerekiyor.**"
    );

  if (message.channel.id !== kanal)
    return message.channel
      .send(
        `<a:YanpSnennleGif:819270147834904676> **Bu komutu sadece <#${kanal}> kanalında kullanabilirsin.**`
      )
      .then(msg => msg.delete(10000));
  if (message.channel.id == kanal) {
    if (!botid)
      return message.channel
        .send(`:no_entry: **Botunun ID'sini yazmalısın.**`)
        .then(msg => msg.delete(10000));
    if (!prefix)
      return message.channel
        .send(`:no_entry: **Botunun prefixini yazmalısın.**`)
        .then(msg => msg.delete(10000));
    if (!onaylımı)
      return message.channel
        .send(`:no_entry: **Botunun Dbl onaylımı onu yazmalısın.**`)
        .then(msg => msg.delete(10000));
    message.delete();
    const basvuruuu = new Discord.MessageEmbed()
      .setColor("PURPLE")
      .addField("<:903735334427303998:924680934958182461> Bot Sıraya Eklendi!",`${message.author} adlı kullanıcı, <@${botid}> adlı botu sıraya ekledi. Botu onaylanmayı bekliyor.`);
    const embed = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setDescription(
        `[Ekle](https://discordapp.com/oauth2/authorize?client_id=${botid}&scope=bot&permissions=0)`,
        true
      )
      .setTitle("Bot Ekletme")
      .addField("Bot Sahibi", message.author.tag)
      .addField("Bot ID", botid)
      .addField("Bot Prefix", prefix)
      .addField("Bot Onaylımı?", onaylımı);
    client.channels.cache.get(basvuru).send(embed);
    client.channels.cache.get(log).send(basvuruuu);
    message.channel
      .send(
        `<:OnayPng:791374123354947634>  **Bot ekleme isteğiniz alındı.**`
      )
      .then(msg => msg.delete(1000));
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["bot-ekle"],
  permLevel: 0
};

exports.help = {
  name: "botekle",
  description: "Sunucuya bot eklemenizi sağlar.",
  usage: "botekle <botid> <prefix>"
};
