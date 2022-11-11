const { MessageEmbed } = require("discord.js");
const i18n = require("i18n");
i18n.setLocale("en");

module.exports = {
    name: "shuffle",
    description: i18n.__('shuffle.description'),
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
        if (player.queue.length < 2) return interaction.followUp('No more songs.');
    
        const array = player.queue.slice(0);
        array.shift();
        let currentIndex = array.length; let randomIndex;
    
        while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        array.unshift(player.queue[0]);
        player.queue = array;

        let nowPlaying = new MessageEmbed()
        .setTitle(i18n.__("nowplaying.embedTitle"))
        .setDescription(`Queue has been shuffled`)
        .setColor("#F8AA2A")
        .setAuthor(interaction.user.username);
        interaction.followUp({embeds: [nowPlaying]});

        return 0;

    } else {

        interaction.followUp("Server Adminstrator Disabled Music Intergration on this Server. If want Renable it, please go to our Dashboard and Re-enable it");

    }
    }
}