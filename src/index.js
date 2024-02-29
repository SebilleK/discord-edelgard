// access to secret configuration
import { TOKEN } from '../secret/config.js';

// discord.js
import { Client, IntentsBitField } from 'discord.js';


const client = new Client({
	intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMembers, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent],

	// permissions for the bot
});

// message create event when a message is sent
client.on('messageCreate', message => {
	console.log(message.content);

	// check if user is a bot
	if (message.author.bot) {
		return;
	}

	// if message contains edelgard, default message
	if (message.content.toLowerCase().includes('edelgard')) {
		message.reply(
			'Greetings! 🦅 I suggest we focus our efforts on strengthening our own strength, as well as our alliances, if we can. For one of my inspiring quotes, you can type /elquote on the chat. Thank you.',
		);
	}
});

// message event on command line if bot is online
client.on('ready', c => {
	console.log(`${c.user.username} (${c.user.tag}) is online & ready for battle! 🦅 `);
});

//! authentication with bot token. Token can be found in the developer portal and MUST be reset if compromised or changed. DO NOT SHARE THIS TOKEN.
client.login(TOKEN);

// https://youtu.be/KZ3tIGHU314?t=530
// https://discord.com/developers/applications/1181766939987677356/information
