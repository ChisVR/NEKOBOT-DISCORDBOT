const { MessageEmbed } = require("discord.js");
const i18n = require("i18n");
i18n.setLocale("en");

module.exports = {
    name: "skip",
    description: i18n.__("skip.description"),
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
        let amount = 1;
        if (player.queue.length < 2) return interaction.reply('No more songs mate.');

        if (amount == null || amount <= 0) amount = 1;
        else if (amount > player.queue.length - 1) amount = player.queue.length - 1;
        let count = 1;
        for (let index = 1; index < amount; index += 1) {
            player.queue.shift();
            count += 1;
        }
        let nowPlaying = new MessageEmbed()
        .setTitle(i18n.__("nowplaying.embedTitle"))
        .setDescription(`Song Skipped`)
        .setColor("#F8AA2A")
        .setAuthor(interaction.user.username);
        
        interaction.followUp({embeds: [nowPlaying]});

        player.player.stop();
        return 0;

    } else {

        interaction.followUp("Server Adminstrator Disabled Music Intergration on this Server. If want Renable it, please go to our Dashboard and Re-enable it");

    }
    }
}