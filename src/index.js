// access to secret configuration
import { TOKEN } from '../secret/config.js';

// discord.js
import { Client, IntentsBitField, EmbedBuilder, ActivityType, AttachmentBuilder } from 'discord.js';

// quotes array
import { quotes } from './data/quotes.js';

// ancient tongue conversion
import { createCanvas, loadImage, registerFont } from 'canvas'; // canvas library

// registering custom font
registerFont('src/data/font/AncientLanguage.ttf', { family: 'Ancient Tongue' });

// utilities
import { predictionApiCall, tenorApiCall, openaiApiCall } from './utility.js';

// ________

const client = new Client({
	intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMembers, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent],

	// permissions for the bot
});

//? event listeners

// sent messages on the server
client.on('messageCreate', message => {
	// bot mention
	const botMention = `<@${client.user.id}>`;

	// console.log(message.content);

	// check if user is a bot
	if (message.author.bot) {
		return;
	}

	// if message contains edelgard, default message
	if (message.content.toLowerCase().includes('edelgard')) {
		message.reply(`I see you mentioned me, ${message.author.username}. Thank you for that! Long live the Empire and its ideals. 🦅`);
	}

	//! if bot is tagged and an attachment is given (for conversor of ancient tongue)
	if (botMention && message.attachments.size > 0) {
		// check if one of the attachments is an image
		const isImage = message.attachments.some(attachment => attachment.contentType.startsWith('image'));
		// if so, proceed to image processing
		if (isImage) {
			message.reply('working! attachment is an image');
		} else {
			message.reply('working! attachment is not an image');
		}
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

		if (interaction.commandName === 'elgif') {
			// tenor api integration

			try {
				const response = await tenorApiCall();

				const randomGif = response.results[Math.floor(Math.random() * response.results.length)];

				// setImage should be used to display the gif on the embed. Be careful with the path to the gif (match a correct one according to the object on response)
				//!! incorrect
				/* console.log(randomGif.url);
				console.log(randomGif.itemurl); */
				//? correct
				/* console.log(randomGif.media_formats.tinygif.url); */

				// Don't forget to credit Tenor as per the API ToS
				const embed = new EmbedBuilder().setColor(0xff0000).setTimestamp().setImage(randomGif.media_formats.tinygif.url).addFields({ name: 'Edelgard GIF 🦅', value: `Via Tenor.` });

				interaction.reply({ embeds: [embed] });
			} catch (error) {
				console.error(`Unexpected error while getting response from the API: ${error}`);
				interaction.reply('Apologies, but an error occurred while getting a random Edelgard GIF. Please try again later. 🦅');
			}
		}

		if (interaction.commandName === 'el') {
			// open ai api integration
			const userQuestion = interaction.options.getString('question');

			if (!userQuestion) {
				// failsafe. the question is required though, this should never happen.
				interaction.reply('Please provide a question. 🦅');
				return;
			} else {
				let reply;
				try {
					const response = await openaiApiCall();
					reply = `${response}`;
				} catch (error) {
					console.error(`Unexpected error while getting response from the API: ${error}`);
					reply = 'Apologies, but an error occurred with the OpenAI API. Please try again later. 🦅';
				}
				const embed = new EmbedBuilder()
					.setColor(0xff0000)
					.setTimestamp()
					.setThumbnail('https://assets.fedatamine.com/3h/face_school/339/0.png')
					.addFields({ name: 'Edelgard 🦅', value: `${reply}` });
				interaction.reply({ embeds: [embed] });
			}
		}

		if (interaction.commandName === 'elreyson') {
			const userInput = interaction.options.getString('input');

			// create a canvas
			const canvas = createCanvas(800, 400);
			const ctx = canvas.getContext('2d');

			// background
			ctx.fillStyle = 'white';
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			// custom font
			ctx.font = '35px Ancient Tongue';

			// wrap text (if text reaches max width of canvas)
			function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
				let words = text.split(' ');
				let line = '';
				for (let n = 0; n < words.length; n++) {
					let testLine = line + words[n] + ' ';
					let metrics = ctx.measureText(testLine);
					let testWidth = metrics.width;
					if (testWidth > maxWidth && n > 0) {
						ctx.fillText(line, x, y);
						line = words[n] + ' ';
						y += lineHeight;
					} else {
						line = testLine;
					}
				}
				ctx.fillText(line, x, y);
			}

			// draw on canvas
			ctx.fillStyle = 'black';
			//? adjust wrapping here if there are canvas changes
			wrapText(ctx, userInput, 10, 50, 780, 36);

			// convert canvas to buffer and make attachment
			const buffer = canvas.toBuffer('image/png');

			const attachment = new AttachmentBuilder(buffer);

			const embed = new EmbedBuilder()
				.setColor(0xff0000)
				.setThumbnail('https://assets.fedatamine.com/3h/face_school/408/0.png')
				.setTimestamp()
				.addFields({ name: 'Ancient Tongue Conversion 🦅', value: `"${userInput}" converted into the Ancient Tongue` });
			interaction.reply({ embeds: [embed], files: [attachment] });
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
					{ name: '**/elgif**', value: 'Edelgard will reply with a random Edelgard GIF via Tenor.' },
					{ name: '**/el**', value: 'Edelgard will answer a given question.' },
					{ name: '**/elreyson**', value: 'Edelgard will convert text to the ancient tongue used by Herons (FE9/10).' },
					{ name: '**/elhelp**', value: 'Edelgard will list all available commands. You just did this one. 🦅 ' },
				);
			interaction.reply({ embeds: [embed] });
		}
	}
});

// bot is online
client.on('ready', c => {
	console.log(`${c.user.username} (${c.user.tag}) is online & ready for battle! 🦅 `);

	client.user.setActivity({
		name: '/elhelp',
		type: ActivityType.Playing,
	});
});

// for process termination (General)
process.on('SIGTERM', () => {
	console.log('Edelgard will rest now. Terminating process... 🦅');
	client.destroy();
	process.exit();
});

//! authentication with bot token. Token can be found in the Discord developer portal and MUST be reset if compromised or changed. DO NOT SHARE THIS TOKEN.
client.login(TOKEN);
