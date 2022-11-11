const { MessageEmbed } = require("discord.js");
const i18n = require("i18n");
i18n.setLocale("en");

module.exports = {
    name: "queue",
    description: i18n.__("queue.description"),
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

        let currentPage = 0;
        const embeds = generateQueueEmbed(interaction, player.queue);

        const queueEmbed = await interaction.followUp(
            {
                content: `**${i18n.__mf("queue.currentPage")} ${currentPage + 1}/${embeds.length}**`,
                embeds: [embeds[currentPage]]
            });

        try {
            await queueEmbed.react("⬅️");
            await queueEmbed.react("⏹");
            await queueEmbed.react("➡️");
        } catch (error) {
            console.error(error);
            interaction.followUp(error.message).catch(console.error);
        }

        const filter = (reaction, user) => ["⬅️", "⏹", "➡️"].includes(reaction.emoji.name) && interaction.user.id === user.id;
        const collector = queueEmbed.createReactionCollector(filter, { time: 60000 });

        collector.on("collect", async(reaction, user) => {
            try {
                if (reaction.emoji.name === "➡️") {
                    if (currentPage < embeds.length - 1) {
                        currentPage++;
                        interaction.editReply({
                            content: `**${i18n.__mf("queue.currentPage")} ${currentPage + 1}/${embeds.length}**`,
                            embeds: [embeds[currentPage]]
                        });
                    }
                } else if (reaction.emoji.name === "⬅️") {
                    if (currentPage !== 0) {
                        --currentPage;
                        interaction.editReply({
                            content: `**${i18n.__mf("queue.currentPage")} ${currentPage + 1}/${embeds.length}**`,
                            embeds: [embeds[currentPage]]
                        });
                    }
                } else {
                    collector.stop();
                    reaction.message.reactions.removeAll();
                }
                await reaction.users.remove(interaction.user.id);
            } catch (error) {
                console.error(error);
                return interaction.followUp(error.message).catch(console.error);
            }
        });

    } else {

        interaction.followUp("Server Adminstrator Disabled Music Intergration on this Server. If want Renable it, please go to our Dashboard and Re-enable it");

    }
    }
}

function generateQueueEmbed(message, queue) {
    let embeds = [];
    let k = 10;

    for (let i = 0; i < queue.length; i += 10) {
        const current = queue.slice(i, k);
        let j = i;
        k += 10;

        const info = current.map((track) => `${++j} - [${track.title}](${track.url})`).join("\n");

        const embed = new MessageEmbed()
            .setTitle(i18n.__("queue.embedTitle"))
            .setThumbnail()
            .setColor("#F8AA2A")
            .setDescription(
                i18n.__mf("queue.embedCurrentSong", { title: queue[0].title, url: queue[0].url, info: info })
            )
            .setTimestamp();
        embeds.push(embed);
    }

    return embeds;
}