const Discord = require('discord.js')
const fs = require("fs");
const config = require("./storage/config.json")
const bot = new Discord.Client();

bot.on('ready', function () {
  console.log("Raphtalia est connectée!");
});

bot.on("guildMemberAdd", user =>{
    user.guild.channels.get("672499693283966986").send("Bienvenue " + user + " sur le serveur " + user.guild.name)
  }
)

bot.commands = new Discord.Collection();
 
fs.readdir("./Commandes/", (err, files) =>{
    if(err) console.log(err);
 
    var jsFiles = files.filter(f => f.split(".").pop() === "js");
    if(jsFiles.length <= 0){
        console.log("Aucun fichier de commande !")
        return;
    }
    jsFiles.forEach((f,i) =>{
        var fileGet = require("./Commandes/" + f);
        console.log("Fichier de commande " + f + " récupéré avec succès !")
        bot.commands.set(fileGet.help.name, fileGet)
    });
});
 
bot.on("ready", async () =>{
    console.log(" ")
    console.log("Connecté en tant que : " + bot.user.tag)
    bot.user.setActivity("?help | Raphtalia", {type: "PLAYING"});
});
 
bot.on("message", message =>{
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
 
    var prefix = config.prefix;
    var messageArray = message.content.split(" ");
    var command = messageArray[0];
    var args = messageArray.slice(1)
    var commands = bot.commands.get(command.slice(prefix.length))
    if(commands) commands.run(bot, message, args);

});

bot.on('message', function (message) {
  if (message.content === '?help') {
      let testEmbed = new Discord.RichEmbed()
          .setDescription("Voici toute les commandes disponible")
          .setColor("#3bcc31")
          .addField("Artisanat: Pour se renseigner sur toute les notions d'artisanat disponible", "Royaumes: Pour se renseigner sur tout les royaumes disponible")
          .setFooter("Utilisez le préfixe ? devant chaque commandes")
     message.channel.send(testEmbed)
}
})

bot.on('message', function (message) {
  if (message.content === '?Artisanat') {
      let testEmbed = new Discord.RichEmbed()
          .setDescription("Voici toute les notions d'artisanat possible")
          .setColor("#3bcc31")
          .addField("Potion: Pour avoir une liste des potions craftables et achetables", "Forge: Pour avoir une liste des armes craftables et achetables")
          .setFooter("D'autres artisanats seront ajoutées par la suite")
     message.channel.send(testEmbed)
}
})

bot.on('message', function (message) {
  if (message.content === '?Forge') {
      let testEmbed = new Discord.RichEmbed()
          .setDescription("Voici toute les armes craftables ou achetables")
          .setColor("#3bcc31")
          .addField("En cours", ".")
          .setFooter("D'autres armes seront ajoutées par la suite")
     message.channel.send(testEmbed)
}
})

bot.on('message', function (message) {
    if (message.content === '?Potion') {
        let testEmbed = new Discord.RichEmbed()
            .setDescription("Voici toute les potions craftables ou achetables")
            .setColor("#3bcc31")
            .addField("-Potion de soin", "-Potion de mana")
            .setFooter("D'autres potions seront ajoutées par la suite")
       message.channel.send(testEmbed)
  }
})

bot.on('message', function (message) {
  if (message.content === '?potion de soin') {
      let testEmbed = new Discord.RichEmbed()
          .setDescription("Potion de soin")
          .setColor("#3bcc31")
          .addField("-Prix: ?? pièces de cuivre", "Niveau d'alchimiste requis pour préparation: 2")
          .addField("-Effet: Soigne ?? points de vie", "Composants:")
          .addField("-Herbes médicinal x2", "-Fiole x1")
     message.channel.send(testEmbed)
}
})

bot.on('message', function (message) {
  if (message.content === '?potion de mana') {
      let testEmbed = new Discord.RichEmbed()
          .setDescription("Potion de mana")
          .setColor("#3bcc31")
          .addField("-Prix: ?? pièces de cuivre", "Niveau d'alchimiste requis pour préparation: 2")
          .addField("-Effet: Rend ?? points de mana", "Composants:")
          .addField("-Champignons bleue x2", "-Fiole x1")
     message.channel.send(testEmbed)
    }     
})

bot.on('message', function (message) {
  if (message.content === '?Royaumes') {
      let testEmbed = new Discord.RichEmbed()
          .setDescription("Voici tout les royaumes disponible")
          .setColor("#3bcc31")
          .addField("Melromarc: Cette commande vous donnera des informations sur ce royaume", ".")
          .setFooter("Les autres royaumes seront ajoutés au fil du RP")
     message.channel.send(testEmbed)
}
})

bot.on('message', function (message) {
  if (message.content === '?Melromarc') {
      let testEmbed = new Discord.RichEmbed()
          .setDescription("Ce royaume accueille la guilde du bouclier")
          .setColor("#3bcc31")
          .addField("Melromarc est le premier royaume accessible par les rolistes, ce royaume vous permettra d'xp du niveau 1 au niveau ??", "Le royaume de Melromarc contient une grande ville et plusieurs villages, c'est un royaume assez vaste au niveau de ses plaines, ses routes à travers les montagnes et ses forêts.") 
          .addField("Les semi-humains sont traités comme des esclave voir même interdit dans certains endroits.", ".")
          .setFooter("Ce royaume possède un roi et une reine")
     message.channel.send(testEmbed)
}
})



bot.login(process.send.TOKEN);