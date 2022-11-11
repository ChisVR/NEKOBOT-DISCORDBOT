const { MessageEmbed } = require("discord.js");
const i18n = require("i18n");
i18n.setLocale("en");

module.exports = {
    name: "stop",
    description: i18n.__('stop.description'),
    type: "CHAT_INPUT",
    toggleOff: false,
    developersOnly: false,
    userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    botpermissions: ["CONNECT", "SPEAK", "SEND_MESSAGES", "VIEW_CHANNEL"],
    cooldowns: 2000,
    options: [],
 
    run: async (client, interaction, args) => {
        var connection = client.sqlconn;

    function getGuildToggle(guildID) {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM guild_command_toggle WHERE guild_id = '${guildID}'`, (err, rows) => {
                if (err) return reject(err);

                resolve(rows);
            });
        });
    }

    const [guildsettingstoggle] = await getGuildToggle(interaction.guild.id) // destructuring 'rows' array
        .catch(console.error);


    if (guildsettingstoggle.musicToggle != 0) {
        const player = interaction.client.queue.get(interaction.guildId);
        player.connection.destroy();
        player.connection = null;
        player.queue = [];
        player.player.unpause();

        let nowPlaying = new MessageEmbed()
        .setTitle(i18n.__("nowplaying.embedTitle"))
        .setDescription(`Song Stopped`)
        .setColor("#F8AA2A")
        .setAuthor(interaction.user.username);
        return interaction.followUp({embeds: [nowPlaying]});
    } else {

        interaction.followUp("Server Adminstrator Disabled Music Intergration on this Server. If want Renable it, please go to our Dashboard and Re-enable it");

    }
    }
}