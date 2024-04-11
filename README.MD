# Edelgard Discord Bot [WIP]

A fun Discord bot based around Edelgard von Hresvelg from the videogame Fire Emblem: Three Houses.

## Preview

![Preview](https://raw.githubusercontent.com/SebilleK/discord-edelgard/master/src/preview/preview.gif)

## Introduction & Set Up

I created this to see how I could implement a bot for Discord. It is inspired by Edelgard from Fire Emblem: Three Houses, and as such it has some fun features based around her, all documented below. Thank you for browsing! Make sure to check the resources if you want to make something similar.

To run the bot directly w/ nodemon enabled:

```bash
npm install
nodemon
```

alternatively without nodemon:

```bash
npm install
node src/index.js
```

(or use the bat file included)

To register new slash commands:

```bash
node src/register-commands.js
```

You should make sure you have all appropriate/equivalent configurations as per the template given.

```bash
// bot token
export const TOKEN = '';

// server id
export const GUILD_ID = '';

// client id (bot id)
export const CLIENT_ID = '';

// tenor api key
export const TENOR_API_KEY = '';

// ...
```

## Slash Commands

To type when the bot is present on a Discord channel.

```bash
/elhey: replies with a simple greeting.
/elquote: replies with a random Edelgard quote from a set of predetermined ones (on src/data/quotes.js)
/elsight: replies with a fortune reading by the 8Ball API. Should include a question as an argument.
/elgif: replies with a random Edelgard gif via Tenor (The query used is by default "edelgard", and the first 100 results are used and then randomized, so other Fire Emblem gifs may appear).
/el: replies to the given question with the OpenAI API (gpt 3.5) in Edelgard's tone.
/elreyson: replies converting the input given into the Ancient Tongue of the Herons (FE9/FE10). FONT CREDITS: Darkspawn980.
/elhelp: lists all available slash commands on the chat.
```

## Useful Links & Resources

- [https://nodemon.io/](https://nodemon.io/): Utility for auto restarting a server on code changes.
- [discord.js](https://discord.js.org/): A node.js module for easy interaction with the Discord API.
- [tutorial_playlist](https://www.youtube.com/watch?v=KZ3tIGHU314&list=PLpmb-7WxPhe0ZVpH9pxT5MtC4heqej8Es): A youtube tutorial series made by Under Ctrl to teach you how to make your own Discord bot using discord.js.
- [AncientTongue](https://serenesforest.net/path-of-radiance/miscellaneous/ancient-language/): Informative page about the Heron's Ancient Tongue used in Fire Emblem 9 and 10, as well as font credits.
- [Canvas](https://github.com/Automattic/node-canvas): Canvas library for image generation/manipulation. Used to generate images for Ancient Tongue Conversion since Discord does not support custom fonts.
- [8ballAPI](https://www.eightballapi.com/): A free, public 8Ball API to get fortune readings.
- [TenorAPI](https://developers.google.com/tenor/guides/quickstart): Tenor API V2 for gifs. V1 isn't supported any longer. [Migration_from_V1](https://developers.google.com/tenor/guides/migrate-from-v1).
- [OpenAIAPI](https://platform.openai.com/docs/introduction): OpenAI API for the /el command.
- [EdelgardInfo](https://houses.fedatamine.com/en-uk/characters/2/Edelgard/basics): FE3H Datamining project, Edelgard information.
