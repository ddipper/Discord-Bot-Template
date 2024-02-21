const fs = require('node:fs')
const path = require('node:path')

const commands_path = __dirname + './../commands/';

module.exports = (discord) => {
   const commandFiles = fs.readdirSync(commands_path).filter(file => file.endsWith('.js'));
   discord.commands = {};
   for (const file of commandFiles) {
      const filePath = path.join(commands_path, file);
      const command = require(filePath);
      if ('data' in command && 'execute' in command) {
         discord.commands.push(command.data.toJSON());
      } else {
         console.error(`The command at ${filePath} is missing a required "data" or "execute" property.`);
      }
   }
}