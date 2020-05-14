## ACModFinder

A discord bot that returns download links to your favorite Assetto Corsa mods! 

## Setup

Set up your `cfg` dir with 2 files: `auth.json` and `google-auth.json`

TODO: Write instructions for setting up these files

### auth.json

Should look like the following

```javascript
{
  "token": "your_discord_bot_token_here"
}
```

### google-auth.json

* Create a google service account using the steps [here](https://cloud.google.com/docs/authentication/getting-started#cloud-console)
* After completing the steps, a JSON file will be automatically downloaded to your computer
* Drop the contents of that file into  `cfg/google-auth.json`

## Usage

`npm start` to start the bot