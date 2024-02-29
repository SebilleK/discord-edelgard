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
