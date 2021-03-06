exports.run = (client, message, args) => {
  
const Discord = require("discord.js");
const con = require('../utils/dbConnector');
const mysql = require('mysql')
let panelURL = {};
let panelAPI = {};
  
var userid = message.author.id;
	con.query(`SELECT * FROM pterocontrol WHERE discord_id = '${userid}'`, function (err, result) {
   
    let NoCon = new Discord.MessageEmbed()
    .setColor("FF0009")
    .setAuthor("PteroControl ¦ Registration", client.user.avatarURL()) 
    .setDescription("```There was an error connecting to the database. Please report this issue to the Developers```")
    .setFooter(`💕PteroControl | https://discord.link/luxury\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
       
       if (err) return message.channel.send(NoCon);
    
           if (result.length == 0) {
               let embed = new Discord.MessageEmbed()
                  .setColor("56FF5B")
                  .setFooter(`💕PteroControl | https://discord.link/luxury\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
                  .setAuthor("PteroControl ¦ Registration", client.user.avatarURL())
                  .setDescription("```Due to privacy reasons, the registration will take place in your DMS. Please ensure than you are allowed to received DMS from this server```")
               message.channel.send(embed);
       
               let embed1 = new Discord.MessageEmbed()
                  .setColor("3768FF")
                  .setFooter(`💕PteroControl | https://discord.link/luxury\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
                  .setAuthor("PteroControl ¦ Registration", client.user.avatarURL())
                  .setDescription("**__What Is PteroControl__**```PteroControl is a simple discord bot which allows users to manage there pterodactyl servers within discord```**__Support Links__**\n**[Youtube](https://m.youtube.com/channel/UChjN4G3gnyn8F7FUo-WRQpA)**\n**[Github](https://github.com/AcktarOfficial)**\n**[Support Server](https://discord.gg/KCuZQgA)**")
               message.author.send(embed1).then(m =>{
        
                  let c = m.channel;
  
        let embed2 = new Discord.MessageEmbed()
           .setColor("#FFDC00")
           .setFooter(`💕PteroControl | https://discord.link/luxury\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
           .setDescription("```1️⃣| What is your panelURL (Ex. https://personal.enzonet.nl)```")
        c.send(embed2).then(async function() {
  
            c.awaitMessages(m => m.author.id == message.author.id,
              {max: 1, time: 30000}).then(async collected => {
                 panelURL = (collected.first().content);
           
            }).then(async function() {
  
        let embed = new Discord.MessageEmbed()
             .setColor("#FFE900")
             .setDescription("```2️⃣| What is your panelAPI```")
             .setFooter(`💕PteroControl | https://discord.link/luxury\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
        c.send(embed).then(async function() {
  
        c.awaitMessages(m => m.author.id == message.author.id,
            {max: 1, time: 30000}).then(async collected =>{
                panelAPI = (collected.first().content);
                   con.query(`INSERT INTO pterocontrol (discord_id, panel_url, panel_api) VALUES ('${message.author.id}', '${panelURL}', '${panelAPI}')`);
       
        let embed = new Discord.MessageEmbed()
          .setAuthor("PteroControl ¦ Registration", client.user.avatarURL())
          .setFooter(`💕PteroControl | https://discord.link/luxury\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
          .setDescription("```You have been registered successfully! You can checkout our available commands with ~help```")
          .setColor("56FF5B")
        c.send(embed);
          })
        })
     })
  })
        })
     } else {
       let embed = new Discord.MessageEmbed()
         .setAuthor("PteroControl ¦ Registration", client.user.avatarURL())
         .setFooter(`💕PteroControl | https://discord.link/luxury\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
         .setColor("FF0009")
         .setDescription("```You are already registered! If your credentials changed, you can update them with ~update```") 
       message.channel.send(embed);
     } 
  }) 
} 
