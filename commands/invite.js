var global_settings = require("../config.json");

exports.description = "Creates an invite for the bot."

module.exports = function (bot, msg)
{
	msg.channel.send("https://discordapp.com/oauth2/authorize?client_id=349748597442740235&scope=bot&permissions=2146958559");
}
