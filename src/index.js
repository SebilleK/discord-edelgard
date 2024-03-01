// access to secret configuration
import { TOKEN } from '../secret/config.js';

// discord.js
import { Client, IntentsBitField } from 'discord.js';

// quotes array
import { quotes } from './data/quotes.js';

// utilities
import { predictionApiCall } from './utility.js';

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
	if (message.author.bot) {
		return;
	}

	// if message contains edelgard, default message
	if (message.content.toLowerCase().includes('edelgard')) {
		message.reply(
			'Greetings! 🦅 Your mention of me is honoring. I suggest we focus our efforts on strengthening ourselves, as well as our alliances, if we can. For one of my inspiring quotes, you can type /elquote on the chat. Thank you.',
		);
	}
});

// slash commands
client.on('interactionCreate', async interaction => {
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

		if (interaction.commandName === 'elsight') {
			// returns response object from 8ball api, a future prediction

			// check if the question is provided by the user, if not, return
			const userQuestion = interaction.options.getString('question');

			if (!userQuestion) {
				interaction.reply('I cannot foresee the future without a question. 🦅');
				return;
			} else {
				try {
					const response = await predictionApiCall();
					interaction.reply(`You asked: **"${userQuestion}"**. \nThe 8ball told me: **"${response.reading} "** 🦅`);
				} catch (error) {
					console.error(`Unexpected error while getting response from the API: ${error}`);
					interaction.reply('Apologies, but an error occurred while foreseeing the future. Please try again later. 🦅');
				}
			}
		}

		if (interaction.commandName === 'elhelp') {
			// list all available commands
			interaction.reply(`>>> **The following slash commands are available:**
			**/elhey:** Edelgard will greet you back.
			**/elquote:** Edelgard will reply with a random Edelgard quote.
			**/elsight:** Edelgard will predict the future with the help of a 8ball. You should provide a question.
			**/elhelp:** Edelgard will list all available commands. You just did this one. 🦅 
			`);
		}
	}
});

// bot is online
client.on('ready', c => {
	console.log(`${c.user.username} (${c.user.tag}) is online & ready for battle! 🦅 `);
});

//! authentication with bot token. Token can be found in the Discord developer portal and MUST be reset if compromised or changed. DO NOT SHARE THIS TOKEN.
client.login(TOKEN);
