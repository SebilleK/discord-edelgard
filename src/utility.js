// utility.js -  utilities for the bot

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
