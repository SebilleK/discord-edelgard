// utility.js -  utilities for the bot
import { TENOR_API_KEY, CLIENT_ID, OPENAI_API_KEY } from '../secret/config.js';
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

// open ai api call — answering questions
export const openaiApiCall = async function openaiApiCall(question) {
	const prompt = `Q: ${question}\nA:`;
	const behaviourPrompt = 'Answer the provided input pretending you are the character Edelgard from Fire Emblem';

	const endpoint = `https://api.openai.com/v1/chat/completions`;

	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${OPENAI_API_KEY}`,
		},
		body: JSON.stringify({
			// this model is super overkill for simple question answering, ada would be better.
			//! text-embedding-ada-002 
			model: 'gpt-3.5-turbo',
			// prompt for the model and additional behaviour configuration
			prompt: prompt,
			messages: [{ role: 'system', content: behaviourPrompt }],
			max_tokens: 150,
			// garantees that the answer is a single line
			stop: ['\n'],
		}),
	};

	try {
		const response = await fetch(endpoint, requestOptions);
		if (!response.ok) {
			throw new Error(`Error while fetching the response. Status: ${response.status}`);
		}

		const data = await response.json();
		// accesses the first output from the model and returns with trimmed whitespaces
		return data.choices[0].text.trim();
	} catch (error) {
		console.error(`Unexpected error while getting response from the API: ${error}`);
		return `Sorry, an error occurred with the OpenAI API. Please try again later. \n **${error}**`;
	}
};
