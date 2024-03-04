// access to secret configuration
import { TOKEN } from '../secret/config.js';

// discord.js
import { Client, IntentsBitField, EmbedBuilder } from 'discord.js';

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
		message.reply(`I see you mentioned me, ${message.author.username}. Thank you for that! Long live the Empire and its ideals. 🦅`);
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
			// using EmbedBuilder (discord.js), you can chain methods to create an embed as you like
			const embed = new EmbedBuilder()
				.setColor(0xff0000)
				.setTitle('Greetings')
				.setThumbnail('https://assets.fedatamine.com/3h/face_school/12/0.png')
				.setTimestamp()
				.addFields({
					name: 'Hello 🦅!',
					value: `Thank you for saying hello, ${interaction.user.username}, and I greet you back. Now let us move on to something else.`,
				});
			interaction.reply({ embeds: [embed] });
		}

		if (interaction.commandName === 'elquote') {
			// pick a random Edelgard quote to reply with
			// note: already imported json files do not need to be parsed since they already are a js object. currently a js array is being used directly, but this note may be useful in the future.
			const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

			const embed = new EmbedBuilder()
				.setColor(0xff0000)
				.setThumbnail('https://assets.fedatamine.com/3h/face_school/408/0.png')
				.setTimestamp()
				.addFields({ name: 'Edelgard Quote 🦅', value: `${randomQuote}` });
			interaction.reply({ embeds: [embed] });
		}

		if (interaction.commandName === 'elsight') {
			// returns response object from 8ball api, a future prediction

			// check if the question is provided by the user, if not, return
			const userQuestion = interaction.options.getString('question');

			if (!userQuestion) {
				// failsafe. the question is required though, this should never happen.
				interaction.reply('I cannot foresee the future without a question. 🦅');
				return;
			} else {
				let reply;
				try {
					const response = await predictionApiCall();
					reply = `You asked: **"${userQuestion}"**. \nThe War Council told me: **"${response.reading} "** 🦅`;
				} catch (error) {
					console.error(`Unexpected error while getting response from the API: ${error}`);
					reply = 'Apologies, but an error occurred while foreseeing the future. Please try again later. 🦅';
				}
				const embed = new EmbedBuilder()
					.setColor(0xff0000)
					.setTimestamp()
					.setThumbnail('https://assets.fedatamine.com/3h/face_school/339/0.png')
					.addFields({ name: 'Edelgard Prediction 🦅', value: `${reply}` });
				interaction.reply({ embeds: [embed] });
			}
		}

		if (interaction.commandName === 'elhelp') {
			// list all available commands
			const embed = new EmbedBuilder()
				.setColor(0xff0000)
				.setTimestamp()
				.setThumbnail('https://assets.fedatamine.com/3h/face_school/16/0.png')
				.addFields(
					{ name: 'Edelgard Bot Slash Commands 🦅', value: `**The following slash commands are available**` },
					{ name: '**/elhey**', value: 'Edelgard will greet you back.' },
					{ name: '**/elquote**', value: 'Edelgard will reply with a random Edelgard quote.' },
					{ name: '**/elsight**', value: 'Edelgard will predict the future with the help of a 8ball. You should provide a question.' },
					{ name: '**/elhelp**', value: 'Edelgard will list all available commands. You just did this one. 🦅 ' },
				);
			interaction.reply({ embeds: [embed] });
		}
	}
});

// bot is online
client.on('ready', c => {
	console.log(`${c.user.username} (${c.user.tag}) is online & ready for battle! 🦅 `);
});

//! authentication with bot token. Token can be found in the Discord developer portal and MUST be reset if compromised or changed. DO NOT SHARE THIS TOKEN.
client.login(TOKEN);
