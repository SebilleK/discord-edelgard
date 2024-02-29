# Edelgard Discord Bot [WIP]

A fun Discord bot based around Edelgard von Hresvelg from the videogame Fire Emblem: Three Houses.

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

To register new slash commands:

```bash
node src/register-commands.js
```

## Slash Commands

To type when the bot is present on a Discord channel.

```bash
/elhey: the bot replies with a simple greeting.
/elquote: the bot replies with a random Edelgard quote from a set of predetermined ones (on src/data/quotes.js)
```

## Useful Links & Resources

- [https://nodemon.io/](https://nodemon.io/): Utility for auto restart a server on code changes.
- [discord.js](https://discord.js.org/): A node.js module for easy interaction with the Discord API.
- [tutorial_playlist](https://www.youtube.com/watch?v=KZ3tIGHU314&list=PLpmb-7WxPhe0ZVpH9pxT5MtC4heqej8Es): A youtube tutorial series made by Under Ctrl to teach you how to make your own Discord bot using discord.js.
