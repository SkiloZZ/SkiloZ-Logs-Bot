var discord = require('discord.js');
var client = new discord.Client();
const config  =  require ( './config' ) ;
var db = require('quick.db');


client.on('ready', async function() {
console.log(client.user.username + " has logged in.");
  setInterval(()=>{
  client.user.setActivity(`&help | in ${client.guilds.size} servers`, {type: "WATCHING"})
    client.user.setStatus(`idle`)
  }, 16000)
});

client.on('messageDelete', async message => {
  
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
 
  if (message.guild) {
    if (message.author.bot) return;
    var x = db.get('loggingchannel_' + message.guild.id)
    x = client.channels.get(x)
    if (message.channel == x) return;
    var embed = new discord.RichEmbed()
    .setColor('FF2D00')
    .setAuthor('message supprimé', message.guild.iconURL)
    .setDescription(message.author.tag + " à supprimé `" + message.content + "` dans " + message.channel)
    x.send(embed).catch()
  }
  
});

client.on("channelCreate", async function(channel){
  if (!channel.guild) return;
   var x = db.get('loggingchannel_' + channel.guild.id)
  var x = client.channels.get(x)
    var embed = new discord.RichEmbed()
    .setColor('FF2D00')
    .setAuthor('salon créer', channel.guild.iconURL)
        .setDescription("nom du salon: " + channel + " et son id " + channel.id)
    x.send(embed).catch()
  

});

client.on("channelDelete", async function(channel){
  if (!channel.guild) return;
   var x = db.get('loggingchannel_' + channel.guild.id)
  var x = client.channels.get(x)

    var embed = new discord.RichEmbed()
    .setColor('FF2D00')
    .setAuthor('salon supprimer', channel.guild.iconURL)
       .setDescription("nom du salon: `" + channel.name + "` et son id " + channel.id)
    x.send(embed).catch()
  

});
client.on("emojiCreate", async function(emoji){
 
   var x = db.get('loggingchannel_' + emoji.guild.id)
  var x = client.channels.get(x)

    var embed = new discord.RichEmbed()
    .setColor('FF2D00')
    .setAuthor('emoji créer', emoji.guild.iconURL)
           .setDescription("nom de l'émoji: " + emoji.name + " et son apparence " + emoji)
    x.send(embed).catch()
  

});
client.on("emojiDelete", async function(emoji){
   var x = db.get('loggingchannel_' + emoji.guild.id)
  var x = client.channels.get(x)

    var embed = new discord.RichEmbed()
    .setColor('FF2D00')
    .setAuthor('emoji supprimer', emoji.guild.iconURL)
           .setDescription("nom de l'émoji: " + emoji.name + " et son url " + emoji.url)
    x.send(embed).catch()
  

}); 
client.on("guildBanAdd", async function(guild, user){
   var x = db.get('loggingchannel_' + guild.id)
  var x = client.channels.get(x)

    var embed = new discord.RichEmbed()
    .setColor('FF2D00')
    .setAuthor("utilisateur ban", guild.iconURL)
               .setDescription(user.tag + " à été ban et son id " + user.id)
    x.send(embed).catch()
  
});
client.on("guildBanRemove", async function(guild, user){

   var x = db.get('loggingchannel_' + guild.id)
  var x = client.channels.get(x)

    var embed = new discord.RichEmbed()
    .setColor('FF2D00')
    .setAuthor("utilisateur unban", guild.iconURL)
               .setDescription(user.tag + " à été unban et son id " + user.id)
    x.send(embed).catch()
});
client.on("guildMemberAdd", async function(member){
   
   var x = db.get('loggingchannel_' + member.guild.id)
  var x = client.channels.get(x)

    var embed = new discord.RichEmbed()
    .setColor('FF2D00')
    .setAuthor("utilisateur à rejoins", member.guild.iconURL)
    .setDescription(member.user.tag + " à rejoins le serveur et son id " + member.user.id)
    x.send(embed).catch()
});
client.on("guildMemberRemove", async function(member){
   var x = db.get('loggingchannel_' + member.guild.id)
  var x = client.channels.get(x)

    var embed = new discord.RichEmbed()
    .setColor('FF2D00')
    .setAuthor("utilisateur à quitté", member.guild.iconURL)
    .setDescription(member.user.tag + " à quitté le serveur et son id " + member.user.id)
    x.send(embed).catch()
  
});


client.on("roleCreate", async function(role){
   var x = db.get('loggingchannel_' + role.guild.id)
  var x = client.channels.get(x)

 
    var embed = new discord.RichEmbed()
    .setColor('FF2D00')
    .setAuthor("rôle créer", role.guild.iconURL)
   .setDescription("Le rôle `" + role.name + "` à été créer et son id " + role.id)
    x.send(embed).catch()
  
});
client.on("roleDelete", async function(role){

   var x = db.get('loggingchannel_' + role.guild.id)
  var x = client.channels.get(x)

    var embed = new discord.RichEmbed()
    .setColor('FF2D00')
    .setAuthor("rôle supprimer", role.guild.iconURL)
   .setDescription("Le rôle `" + role.name + "` à supprimer créer et son id " + role.id)
    x.send(embed).catch()
  
});

client.on('message', async message => {
  
   const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
   var x = await db.get('loggingchannel_' + message.guild.id)
  
     if (command == "resetlogs") {
    if (!message.guild) return message.reply('exécute cette commande dans le serveur.')
     if (!message.member.hasPermission(`ADMINISTRATOR`)) return message.channel.send(`tu n'as pas la permission admin.`)
     await db.delete(`loggingchannel_${message.guild.id}`)
  message.channel.send(`voilà, le salon des logs à été reset. (\`${prefix}setlogs\`).`)
  }
   
  if (command == "setlogs") {
    if (!message.guild) return message.reply('exécute cette commande dans le serveur.')
     if (!message.member.hasPermission(`ADMINISTRATOR`)) return message.channel.send(`tu n'as pas la permission admin.`)
     if (!args[0] || args[1]) return message.reply(`indique un salon: \`${prefix}setlogs #salon\`.`)
    
     x = message.mentions.channels.first()
    if (!x) return message.channel.send(`indique un salon: \`${prefix}setlogs #salon\`.`)
     await db.set(`loggingchannel_${message.guild.id}`, x.id)
      message.channel.send(`les logs apparaîtront dans ${x}.`)
  }
  
});

client.on('error', e=> {console.log(e)})
client.login(config.token).catch(e=>console.log(e));