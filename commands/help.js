exports.run = (client, message, args) => {
  
  const Discord = require("discord.js");
  
  let helpEmbed = new Discord.MessageEmbed()
    .setColor("009DFF")
    .setAuthor("LuxuryControl ¦ Help Menu", client.user.avatarURL()) 
    .addField("~register", "```Daftarkan informasi panel Anda```")
    .addField("~update", "```Perbarui informasi panel Anda jika diubah```")
    .addField("~myservers", "```Perintah utama untuk Manajemen Server```") 
    .setFooter(`💕LuxuryControl | https://discord.link/luxury\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
  message.channel.send(helpEmbed);
  
}
