const { MessageEmbed, Permissions } = require("discord.js");
const backup = require("discord-backup");
var fs = require('fs');

module.exports = {
   name: "serverbackup",
   description: "Backup Server",
   type: "CHAT_INPUT",
   options: [],

   run: async (client, interaction, args) => {

    if (!interaction.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR])) return interaction.followUp("YOU DONT HAVE PERMISSION DO THIS!")

    backup.setStorageFolder(__dirname+'/serverbackup/');

    backup.create(interaction.member.guild, {
        jsonBeautify: true
    }).then((backupData) => {
        interaction.followUp(`Your Backup ID of this Server: ${backupData.id}\n\n Keep this Safe and Dont Loose it!`);
    });
   },
};
