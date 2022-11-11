const Discord = require("discord.js");
const discordTTS = require('discord-tts');
const {AudioPlayer, createAudioResource, StreamType, entersState, VoiceConnectionStatus, joinVoiceChannel, createAudioPlayer} = require("@discordjs/voice");

let voiceConnection;
let audioPlayer=new AudioPlayer();

module.exports = {
   name: "tts",
   aliases: ["ttssay"],
   description: "Sends TTS inside Voice Chat",
   botpermissions: ["SEND_MESSAGES"],
   usage: "Sends TTS in Voice Chat",
   cooldowns: 200,
   developersOnly: false,
   toggleOff: false,
   run: async (client, message, args) => {

        if (args[0] == "ttsstop") {

            if (!message.member.voice.channel) return
            var channel = message.member.voice;
                
            connection1 = joinVoiceChannel({
                channelId: channel.channelId,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
            });
                
            let resource = createAudioResource("", {
                inlineVolume : true
            });

            resource.volume.setVolume(0.2);
                
            const player = createAudioPlayer();
            connection1.destroy();
            player.stop(resource);
            message.delete().catch(O_o => {})
            return
            
        } else {

            const search = message.content.split(' ').splice(1).toString();

            //const stream=discordTTS.getVoiceStream(search);
            const url = `https://api.streamelements.com/kappa/v2/speech?voice=Ivy&text=${encodeURIComponent(search)}`
            if (!message.member.voice.channel) return
            var channel = message.member.voice;
                
            connection1 = joinVoiceChannel({
                channelId: channel.channelId,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
            });
                
            let resource = createAudioResource(url, {
                inlineVolume : true
            });

            resource.volume.setVolume(1);
                
            const player = createAudioPlayer();

           connection1.subscribe(player)
           player.play(resource);
        }
   },
};
