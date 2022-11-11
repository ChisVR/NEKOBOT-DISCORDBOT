const { MessageEmbed, Permissions } = require("discord.js");
const backup = require("discord-backup");
var fs = require('fs');

module.exports = {
   name: "serverrestore",
   description: "Restore Server",
   type: "CHAT_INPUT",
   options: [{
    name: 'backupid',
    description: 'Give us Backup ID',
    type: 'STRING',
    required: true
   }],

   run: async (client, interaction, args) => {

    if (!interaction.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR])) return interaction.followUp("YOU DONT HAVE PERMISSION DO THIS!")
    
    backup.setStorageFolder(__dirname+'/serverbackup/');

    backup.load(interaction.options.getString('backupid'), interaction.member.guild).then(() => {
        interaction.followUp('Restore has been Compleated! Enjoy...');
    });

   },
};
