const Discord = require("discord.js");
const db = require("quick.db");

exports.run = function(client, message, args) {
  let yetkili = db.fetch(`byetkili_${message.guild.id}`);
  if (!message.member.roles.cache.has(yetkili))
    return message.channel.send("Bu Komutu Kullanamazsın");
  let botisim = args[0];
  let sahip = args[1];
  let basvuru = db.fetch(`basvuruk_${message.guild.id}`);
  let kanal = db.fetch(`bot-ekle_${message.guild.id}`);
  let log = db.fetch(`bot-log_${message.guild.id}`);
  if (!log)
    return message.channel.send(
      "Bu komudu kullanmak için botlist kanallarının sunucuda ayarlı olması gerekiyor."
    );
  if (!basvuru)
    return message.channel.send(
      "Bu komudu kullanmak için botlist kanallarının sunucuda ayarlı olması gerekiyor."
    );
  if (!kanal)
    return message.channel.send(
      "Bu komudu kullanmak için botlist kanallarının sunucuda ayarlı olması gerekiyor."
    );
  const onay = new Discord.MessageEmbed()
    .setColor("GREEN")
    .addField("<:903735334427303998:924680934958182461> Bot Onaylandı!",`<@${sahip}> adlı kişinin <@${botisim}> adlı botu ${message.author} tarafından onaylandı.`);

  if (!botisim)
    return message.channel
      .send(`:no_entry: Botun idsini yazmalısın.`)
      .then(msg => msg.delete(10000));
  message.delete();
  message.channel.send(`Botu onayladınız.`).then(msg => msg.delete(1000));
  client.channels.cache.get(log).send(onay);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["bot-onayla", "onayla"],
  permLevel: 3
};

exports.help = {
  name: "botonayla",
  description: "Sunucuya eklenen botu onaylar.",
  usage: "botonayla <bot ismi>"
};
