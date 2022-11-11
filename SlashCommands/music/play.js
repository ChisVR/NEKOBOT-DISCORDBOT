const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { createAudioPlayer, createAudioResource, joinVoiceChannel } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const ytsr = require('ytsr');
const ytpl = require('ytpl');
const { getPreview, getTracks } = require('spotify-url-info');
const i18n = require("i18n");
i18n.setLocale("en");

let serverPlayer = {};

function playing() {
    const stream = ytdl(serverPlayer.queue[0].url, {
      // eslint-disable-next-line no-bitwise
      filter: 'audioonly', type: 'opus', quality: 'highestaudio', highWaterMark: 1 << 25,
    });
    const source = createAudioResource(stream);
    serverPlayer.player.play(source);
    const conc = serverPlayer.connection;
    conc.subscribe(serverPlayer.player);
  
    return 0;
  }
  function outputter(interaction, playlist, spotify, spotList) {
    if (playlist != null) {
      if (serverPlayer.player.state.status !== 'playing' && serverPlayer.player.state.status !== 'paused') {
        playing();
        return interaction.editReply(`Playlist ${playlist.title} now playing`);
      }
      return interaction.editReply(`Playlist ${playlist.title} has been added to queue.`);
    }
    if (spotList != null) {
      if (serverPlayer.player.state.status !== 'playing' && serverPlayer.player.state.status !== 'paused') {
        playing();
        return interaction.editReply(`Playlist ${spotList} now playing`);
      }
      return interaction.editReply(`Playlist ${spotList} has been added to queue.`);
    }
  
    if (serverPlayer.queue.length < 2) {
      playing();
      if (spotify == null) return interaction.editReply({ embeds: [new MessageEmbed().setColor('#0099ff').setTitle(serverPlayer.queue[0].title + ' is now playing!')]})
      return interaction.editReply(`${spotify.link} now playing`);
    }
    if (spotify == null) return interaction.editReply({ embeds: [new MessageEmbed().setColor('#0099ff').setTitle(serverPlayer.queue[serverPlayer.queue.length - 1].title + ' is now playing!')]})
    return interaction.editReply(`${spotify.link} has been added to queue.`);
  }

module.exports = {
   name: "play",
   description: i18n.__("play.description"),
   type: "CHAT_INPUT",
   toggleOff: false,
   developersOnly: false,
   userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
   botpermissions: ["CONNECT", "SPEAK", "SEND_MESSAGES", "VIEW_CHANNEL"],
   cooldowns: 2000,
   options: [{
    name: 'song',
    description: 'Insert Song Link or song title',
    type: 'STRING',
    required: true
   }],

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


    const serverQueue = interaction.client.queue.get(interaction.guild.id);
    let input = interaction.options.getString('song');

    if (!interaction.member.voice.channel) {
      return interaction.reply('Please join a voice channel.');
    }
    interaction.reply('Processing');
    if (!serverQueue) {
      serverPlayer = {
        // eslint-disable-next-line no-undef
        player: player = createAudioPlayer(),
        queue: [],
        connection: joinVoiceChannel({
          channelId: interaction.member.voice.channelId,
          guildId: interaction.guildId,
          adapterCreator: interaction.guild.voiceAdapterCreator,
        }),
      };

      serverPlayer.player.on('stateChange', () => {
        if (serverPlayer.player.state.status === 'idle') {
          console.log('song ended');
          serverPlayer.queue.shift();
          if (serverPlayer.queue.length === 0) {
            serverPlayer.connection.destroy();
            serverPlayer.connection = null;
          } else { playing(); }
        }
      });
    } else if (!serverPlayer.connection) {
      serverPlayer.connection = joinVoiceChannel({
        channelId: interaction.member.voice.channelId,
        guildId: interaction.guildId,
        adapterCreator: interaction.guild.voiceAdapterCreator,
      });
    }
    if (input.includes('&list=')) {
      if (input.includes('&list=LL')) {
        // eslint-disable-next-line prefer-destructuring
        input = input.split('&')[0];
        console.log(input);
        input = input.replace(/\&ab_channel(.*)/, '');
        const result = await ytsr(input, { limit: 1 });
        const song = {
          title: result.items[0].title,
          url: result.items[0].url,
        };
        serverPlayer.queue.push(song);
        outputter(interaction, null, null, input);
      } else {
        const playlist = await ytpl(input, { limit: Infinity });
        playlist.items.forEach((element) => {
          const song = {
            title: element.title,
            url: element.shortUrl,
          };
          serverPlayer.queue.push(song);
        });
        outputter(interaction, playlist);
      }
    } else if (input.includes('https://open.spotify.com/playlist') || input.includes('https://open.spotify.com/album')) {
      const promisesToAwait = [];
      await getTracks(input).then((tracks) => {
        tracks.forEach(async (element) => {
          promisesToAwait.push(ytsr(`${element.artists[0].name} ${element.name}`, { limit: 1 }));
        });
      });
      const respons = await Promise.all(promisesToAwait);
      respons.forEach((element) => {
        const song = {
          title: element.items[0].title,
          url: element.items[0].url,
        };
        serverPlayer.queue.push(song);
      });
      outputter(interaction, null, null, input);
    } else {
      let result;
      let spotifyTrack = null;
      if (input.includes('https://open.spotify.com/track')) {
        spotifyTrack = await getPreview(input);
        result = await ytsr(`${spotifyTrack.artist} ${spotifyTrack.title}`, { limit: 1 });
      } else {
        // eslint-disable-next-line no-useless-escape
        input = input.replace(/\&ab_channel(.*)/, '');
        result = await ytsr(input, { limit: 1 });
      }
      const song = {
        title: result.items[0].title,
        url: result.items[0].url,
      };
      serverPlayer.queue.push(song);
      outputter(interaction, null, spotifyTrack);
    }

    interaction.client.queue.set(interaction.guildId, serverPlayer);
    return 0;

    } else {

        interaction.followUp("Server Adminstrator Disabled Music Intergration on this Server. If want Renable it, please go to our Dashboard and Re-enable it");

    }

   }
}