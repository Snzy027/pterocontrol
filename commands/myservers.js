exports.run = (client, message, args) => {
	
const Discord = require("discord.js");
const node = require('nodeactyl');
const Client = node.Client;
const mysql = require('mysql');
const con = require('../utils/dbConnector');

var userid = message.author.id;
  con.query(`SELECT * FROM pterocontrol WHERE discord_id = '${userid}'`, function (err, result) {
  	
  let NotRegistered = new Discord.MessageEmbed()
  .setAuthor("LuxuryControl ¦ Management", client.user.avatarURL())
  .setColor("#FF493E")
  .setDescription("```Anda tidak terdaftar di sistem kami. Anda dapat mendaftar dengan ~register```")
  .setFooter(`💕LuxuryControl | https://discord.link/luxury\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
  
  let ErrCon = new Discord.MessageEmbed()
  .setAuthor("LuxuryControl ¦ Management", client.user.avatarURL())
  .setColor("#FF56FA")
  .setFooter(`💕LuxuryControl | https://discord.link\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
  .setDescription("```Terjadi kesalahan saat menyambungkan ke database. Silakan laporkan masalah ini ke TeamLuxury```")
  
	  if (err) return message.channel.send(ErrCon);
	       if (result.length == 0) return message.channel.send(NotRegistered);     
	            var rows = JSON.parse(JSON.stringify(result[0]));
		        
	               Client.login(rows.panel_url, rows.panel_api);
    
    const emoji = ['❌', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];
       let index = 0;

   Client.getAllServers().then((response) => {
	  let Embed1 = new Discord.MessageEmbed()
            .setColor("#2091FF")
            .setFooter(`💕LuxuryControl | https://discord.link/luxury\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL()) 
            
    if (response.length == 0) {
       Embed1.setDescription("```Anda tidak memiliki server di akun Anda```");
    } else {
      response.map(S => {
       Embed1.addField(emoji[++index]+" | "+S.attributes.name+" \ `"+S.attributes.identifier+"`", "```Ram: "+S.attributes.limits.memory+" MB\nDisk: "+S.attributes.limits.disk+" MB\nCPU: "+S.attributes.limits.cpu+"%```");
      })
      message.channel.send(Embed1).then(M => {
    
    for (let i = 0; i < response.length + 1; i++) {
         M.react(emoji[i]);
    }
        
    const collector = M.createReactionCollector((r, u) => emoji.includes(r.emoji.name) && u.id === message.author.id, { max: 1 });

    collector.on('collect', async (r, u) => {
           M.reactions.removeAll();
           if (r.emoji.name === '❌') {
             let Embed2 = new Discord.MessageEmbed() 
                Embed2.setFooter(`💕LuxuryControl | https://discord.link/luxury\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL()) 
                Embed2.setAuthor("LuxuryControl ¦ Management", client.user.avatarURL()) 
                Embed2.setColor("#FF74F4")
                Embed2.setDescription("```Anda membatalkan Menu Management Server```") 
             message.delete();
             return M.edit(Embed2).then(m => m.delete({ timeout: 2000}));
           }
      
           const selected = response[emoji.indexOf(r.emoji.name) - 1];
           const status = await Client.getServerStatus(selected.attributes.identifier);
           const ramMemory = await Client.getRAMUsage(selected.attributes.identifier);
           const cpuUsage = await Client.getCPUUsage(selected.attributes.identifier);
           const diskUsage = await Client.getDiskUsage(selected.attributes.identifier);
      
           if (status === "on" || status === "starting"){
              let infoEmbed = new Discord.MessageEmbed()
                .setAuthor("LuxuryControl ¦ Management", client.user.avatarURL()) 
                .setColor("#A700FF")
                .setFooter(`💕LuxuryControl | https://discord.link/luxury\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
                .addField("Selected Service 〉"+selected.attributes.name, "```Status: "+status.replace('starting', 'Starting').replace('off', 'Offline').replace('on', 'Online')+"\nMemory Usage: "+ramMemory.current+"/"+ramMemory.limit+"MB"+"\nCpu Usage: "+cpuUsage.current+"%"+"\nDisk Usage: "+diskUsage.current+"/"+diskUsage.limit+"MB"+"```\n**__Power Actions__**\n(🖥️) » *Restart the server*\n(🔒) » *Stop the server*\n(❌) » *Exits the process*")
              M.edit(infoEmbed).then(msg => {
                 msg.react('🖥️').then(r => {
                 msg.react('🔒').then(r => {
                 msg.react('❌')
          
 const CancelFilter = (reaction, user) => {
    return reaction.emoji.name === '❌' && user.id === message.author.id;};

 const collector = msg.createReactionCollector(CancelFilter, { time: 15000 });

 collector.on('collect', (reaction, user) => {
      msg.reactions.removeAll()
             const Embed2 = new Discord.MessageEmbed()
               Embed2.setAuthor("LuxuryControl ¦ Management", client.user.avatarURL()) 
               Embed2.setColor("#A700FF")
               Embed2.setFooter(`💕LuxuryControl | https://discord.link/luxury\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
               Embed2.setDescription("```You cancelled the Server Management Menu```");
      msg.edit(Embed2);
});
          
 const RestartFilter = (reaction, user) =>{
   return reaction.emoji.name === '🖥️' && user.id === message.author.id;};

 const collector2 = msg.createReactionCollector(RestartFilter, {time: 15000, })

 collector2.on('collect', (reaction, user) =>{
      msg.reactions.removeAll()
      Client.restartServer(selected.attributes.identifier);
      const Embed3 = new Discord.MessageEmbed()
         Embed3.setAuthor("LuxuryControl ¦ Management", client.user.avatarURL()) 
         Embed3.setColor("#A700FF")
         Embed3.setFooter(`💕LuxuryControl | https://discord.link/luxury\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
         Embed3.setDescription("```Server Anda telah dijalankan ulang (Restarted)```")
      msg.edit(Embed3);
});
            
const StopFilter = (reaction, user) =>{
  return reaction.emoji.name === '🔒' && user.id === message.author.id;};

const collector3 = msg.createReactionCollector(StopFilter, {time: 15000, })

 collector3.on('collect', (reaction, user) =>{
      msg.reactions.removeAll()
      Client.stopServer(selected.attributes.identifier);
      const Embed4 = new Discord.MessageEmbed()
         Embed4.setAuthor("LuxuryControl ¦ Management", client.user.avatarURL()) 
         Embed4.setColor("#A700FF")
         Embed4.setFooter(`💕LuxuryControl | https://discord.link/luxury\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
         Embed4.setDescription("```Server Anda telah dihentikan (Stopped)```")
      msg.edit(Embed4);
});
          
          })
       })
   })
} else if (status === "off"){
   let infoEmbed = new Discord.MessageEmbed()
       .setAuthor("LuxuryControl ¦ Management", client.user.avatarURL()) 
       .setColor("#A700FF")
       .setFooter(`💕LuxuryControl | https://discord.link/luxury\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
       .addField("Selected Service 〉"+selected.attributes.name, "```Status: "+status.replace('starting', 'Starting').replace('off', 'Offline').replace('on', 'Online')+"\nMemory Usage: "+ramMemory.current+"/"+ramMemory.limit+"MB"+"\nCpu Usage: "+cpuUsage.current+"%"+"\nDisk Usage: "+diskUsage.current+"/"+diskUsage.limit+"MB"+"```\n**__Power Actions__**\n(🖥️) » *Start the server*\n(❌) » *Exits the process*")
   M.edit(infoEmbed).then(msg => {
       msg.react('🖥️').then(r => {
         msg.react('❌')
 
const CancelFilter = (reaction, user) => {
   return reaction.emoji.name === '❌' && user.id === message.author.id;};

const collector = msg.createReactionCollector(CancelFilter, { time: 15000 });

collector.on('collect', (reaction, user) => {
   msg.reactions.removeAll()
       const Embed2 = new Discord.MessageEmbed()
             Embed2.setAuthor("LuxuryControl ¦ Management", client.user.avatarURL()) 
             Embed2.setColor("#A700FF")
             Embed2.setFooter(`💕LuxuryControl | https://discord.link/luxury\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
             Embed2.setDescription("```Anda membatalkan Menu Management Server```");
       msg.edit(Embed2);
});
          
const StartFilter = (reaction, user) =>{
   return reaction.emoji.name === '🖥️' && user.id === message.author.id;};

 const collector2 = msg.createReactionCollector(StartFilter, {time: 15000, })

 collector2.on('collect', (reaction, user) =>{
      msg.reactions.removeAll()
      Client.startServer(selected.attributes.identifier);
      const Embed3 = new Discord.MessageEmbed()
         Embed3.setAuthor("LuxuryControl ¦ Management", client.user.avatarURL()) 
         Embed3.setColor("#A700FF")
         Embed3.setFooter(`💕LuxuryControl | https://discord.link/luxury\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
         Embed3.setDescription("```server Anda telah dijalankan (Started)```")
      msg.edit(Embed3);
         })
      })
   })
} 
      
          })
         })
       }
    }).catch(e => {
     let ErrCon = new Discord.MessageEmbed()
        .setAuthor("LuxuryControl ¦ Management", client.user.avatarURL())
        .setColor("#FF56FA")
        .setFooter(`💕LuxuryControl | https://discord.link/luxury\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
        .setDescription("```Terjadi kesalahan saat menyambungkan ke Control Panel Anda! Harap pastikan bahwa Anda memasukkan apikey dan hosturl yang benar selama proses registrasi```")
     message.channel.send(ErrCon);
   })
  })
} 
