// access to secret configuration
import { TOKEN } from '../secret/config.js';

// discord.js
import { Client, IntentsBitField } from 'discord.js';

// quotes array
import { quotes } from './data/quotes.js';

// ________

const client = new Client({
	intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMembers, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent],

	// permissions for the bot
});

//? event listeners

// sent messages on the server
client.on('messageCreate', message => {
	// console.log(message.content);

	// check if user is a bot
	/* if (message.author.bot) {
		return;
	} */

	// if message contains edelgard, default message
	if (message.content.toLowerCase().includes('edelgard')) {
		message.reply(
			'Greetings! 🦅 Your mention of me is honoring. I suggest we focus our efforts on strengthening ourselves, as well as our alliances, if we can. For one of my inspiring quotes, you can type /elquote on the chat. Thank you.',
		);
	}
});

// slash commands
client.on('interactionCreate', interaction => {
	// not a slash command
	if (!interaction.isChatInputCommand()) {
		return;

		// if slash command, conditional responses based on name
	} else {
		if (interaction.commandName === 'elhey') {
			interaction.reply('Greetings! 🦅');
		}

		if (interaction.commandName === 'elquote') {
			// pick a random Edelgard quote to reply with
			// note: already imported json files do not need to be parsed since they already are a js object. currently a js array is being used directly, but this note may be useful in the future.
			const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
			interaction.reply(`${randomQuote}`);
		}
	}
});

// bot is online
client.on('ready', c => {
	console.log(`${c.user.username} (${c.user.tag}) is online & ready for battle! 🦅 `);
});

//! authentication with bot token. Token can be found in the Discord developer portal and MUST be reset if compromised or changed. DO NOT SHARE THIS TOKEN.
client.login(TOKEN);
