import { TOKEN, CLIENT_ID, GUILD_ID } from '../secret/config.js';
import { REST, Routes } from 'discord.js';

// array of commands

const commands = [
	{
		// note — command names should be lowercase
		name: 'elhey',
		description: 'Greets the user',
	},
	{
		name: 'elquote',
		description: 'Gives a random Edelgard quote',
	},
	{
		name: 'elsight',
		description: 'Predicts the future à la 8ball with a given question',
		options: [
			{
				name: 'question',
				description: 'The question 8ball should answer',
				type: 3,
				required: true,
			},
		],
	},
	{
		name: 'elgif',
		description: 'Gives a random Edelgard via Tenor',
	},
	{
		name: 'el',
		description: 'Answers a given question',
		options: [
			{
				name: 'question',
				description: 'The question Edelgard should answer',
				type: 3,
				required: true,
			},
		],
	},
	{
		name: 'elreyson',
		description: 'Converts given question into Ancient Tongue (FE9/FE10)',
		options: [
			{
				name: 'input',
				description: 'Text to convert',
				type: 3,
				required: true,
			},
		],
	},
	{
		name: 'elhelp',
		description: 'Gives a list of commands',
	},
];

// async function to register commands, IIFE
(async () => {
	const rest = new REST({ version: '10' }).setToken(TOKEN);
	try {
		console.log('Registering / commands...');

		await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });

		console.log('Commands registered successfully!');
	} catch (error) {
		console.error(`Error when registering commands: ${error}`);
	}
})();
