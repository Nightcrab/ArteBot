const Discord = require('discord.js');
const bot = new Discord.Client();
var global_settings = require("./settings.json");
var fs = require('fs');
var funcs = require("./funcs.js");
var commands =
{
	help	:	require("./commands/help.js"),
	settings	:	require("./commands/settings.js")
	//idban	:	require("./commands/idban.js")
};
var sudo =
{
	evaluate	:	require("./sudo/eval.js"),
	settings	:	require("./sudo/settings.js")
};

bot.on("guildCreate", (guild) =>
{
	funcs.guildfolder(guild);
});
bot.on("guildMemberAdd", (member) =>
{
	let local_settings = require(funcs.guildfolder(member.guild)+"/settings.json");
	for (i=0;i>local_settings.banned_users.length;i++)
	{
		if (local_settings.banned_users[i] == member.user.id)
		{
			member.ban();
			if (local_settings.modlog != undefined)
			{
				msg.guild.channels.get(local_settings.modlog).send("ID banned user ID: "+id);
			}
		}
	}
})
bot.on("message", (message) =>
{
	let local_settings = require(funcs.guildfolder(message.guild)+"/settings.json");
	let command = message.content.split(' ')[0];
	let ncommand = '';
	command = command.split('');
	for (i=0;i<local_settings.prefix.split('').length;i++)
	{
		command.shift();
	}
	for (i=0;i<command.length;i++)
	{
		ncommand += command[i];
	}
	command = ncommand;
	
	if (command == "sudo")
	{
		if (!sudo[message.content.split(' ')[1]])
		{
			return;
		}
		else if (message.author.id == 108090007117438976)
		{
			sudo[message.content.split(' ')[1]](message,bot);
		}
	}
	if (!commands[command])
	{
		return;
	}
	else
	{
		commands[command](message,bot);
	}
});

bot.login(global_settings.token);