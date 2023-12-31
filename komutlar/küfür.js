const Discord = require("discord.js");
const db = require("quick.db");
exports.run = async (client, message, args) => {
  if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
      .setColor(0xff0000)
      .setTimestamp()
      .setAuthor(message.author.username, message.author.avatarURL)
      .addField("**Komutları Özel Mesajlarda Kullanılamaz!**");
    return message.author.send(ozelmesajuyari);
  }
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.reply("Koçum yetki kapta gel!");
  let reklam = db.fetch(`kufurengel.${message.guild.id}`);
  if (!reklam) {
    message.channel.send(`Küfür filtresi başarıyla açıldı.`);
    db.set(`kufurengel.${message.guild.id}`, true);
  } else {
    message.channel.send(`Küfür filtresi başarıyla kapatıldı.`);
    db.delete(`kufurengel.${message.guild.id}`);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["küfür"],
  permLevel: 0
};

exports.help = {
  name: "küfür-engel",
  description: "YRNEX",
  usage: "reklam-filtre"
};
