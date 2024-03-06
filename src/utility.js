// utility.js -  utilities for the bot
import { TENOR_API_KEY, CLIENT_ID } from '../secret/config.js';
// 8 ball api call
export const predictionApiCall = async function predictionApiCall() {
	const url = 'https://eightballapi.com/api';

	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`Error while fetching the response. Status: ${response.status}`);
		}
		const data = await response.json();

		// console.log(data);
		return data;
	} catch (error) {
		console.error(`Unexpected error: ${error}`);
	}
};

// tenor api call
export const tenorApiCall = async function tenorApiCall() {
	const query = 'edelgard';
	const limit = 100;

	const endpoint = `https://tenor.googleapis.com/v2/search?q=${query}&key=${TENOR_API_KEY}&client_key=${CLIENT_ID}&limit=${limit}`;

	try {
		const response = await fetch(endpoint);

		if (!response.ok) {
			throw new Error(`Error while fetching the response. Status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error(`Unexpected error: ${error}`);
	}
	console.log('data fetched from tenor');
	console.log(data);
};
