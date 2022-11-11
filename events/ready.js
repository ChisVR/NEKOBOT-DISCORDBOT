const client = require("../index");
const chalk = require("chalk");
var moment = require('moment');
const fetch = require('node-fetch');

const { version: discordjsVersion, MessageEmbed, WebhookClient } = require("discord.js");

const { prefix } = require("../config/settings.json");
const main_json = require("../config/settings.json");

const request = require("request");

let Parser = require('rss-parser');
let parser = new Parser({
    headers: {
        'User-Agent': 'ChisdealHDYT Discord BOT/V7.1'
    },
});

const entities = require('entities');
const validUrl = require('valid-url');

let lastTimestamp = Math.floor(Date.now() / 1000);

//var backday1 = moment().subtract(1,'days').unix()

let GuildChis;
let ChannelChis;

function toTimestamp(strDate) {
  var datum = Date.parse(strDate);
  return datum / 1000;
}

const characters ='abcdefghijklmnopqrstuvwxyz';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result.replace(/ /g, '');
}

const vortexlistapi = require("discordz.xyz");
const { AutoPoster } = require('topgg-autoposter')
const { InfinityAutoPoster } = require('ibl-autopost')

async function vortexlist(apikey, client1, botReady) {
    console.log("");
    console.log(chalk.red.bold("——————————[VORTEXLIST]——————————"));
    if (apikey == "" || apikey == null) {
        return console.log(
            chalk.gray(
                `[VortexList]: Not Setup, Please Set this up if Required?`
            )
        );
    } else {
        console.log(
            chalk.gray(
                `[VortexList]: I have been setup, I refresh every 5 Minuteds on Site Provent API Floods`
            )
        );
        setInterval(() => {
            if (botReady) {
                const vortexlistdbl = new vortexlistapi(apikey, client1);
                vortexlistdbl.serverCount();
                console.log("[VortexList]: Server count posted")
            }
        }, 5 * 60 * 1000); // 5 Minutes
    }
}

async function topgglist(apikey, client1, botReady) {
    console.log("");
    console.log(chalk.red.bold("——————————[TOPGG]——————————"));
    if (apikey == "" || apikey == null) {
        return console.log(
            chalk.gray(
                `[TopGG]: Not Setup, Please Set this up if Required?`
            )
        );
    } else {
        console.log(
            chalk.gray(
                `[TopGG]: I have been setup, I refresh every 5 Minuteds on Site Provent API Floods`
            )
        );
        //setInterval(() => {
            if (botReady) {
                const ap = AutoPoster(apikey, client1)

                ap.on('posted', () => {
                    console.log('[TopGG]: Server count posted')
                })
            }
        //}, 5 * 60 * 1000); // 5 Minutes
    }
}

async function infinitybots(apikey, client1, botReady) {
    console.log("");
    console.log(chalk.red.bold("——————————[INFINITYBOTS]——————————"));
    if (apikey == "" || apikey == null) {
        return console.log(
            chalk.gray(
                `[InfinityBots]: Not Setup, Please Set this up if Required?`
            )
        );
    } else {
        console.log(
            chalk.gray(
                `[InfinityBots]: I have been setup, I refresh every 5 Minuteds on Site Provent API Floods`
            )
        );
        setInterval(() => {
            if (botReady) {
                const infinitybotsdbl = InfinityAutoPoster(apikey, client1)
    
                infinitybotsdbl.on('posted', () => {
                    console.log('[InfinityBots]: Server count posted')
                })
            }
        }, 5 * 60 * 1000); // 5 Minutes
    }
}

async function ondiscord(apikey, client1, botReady) {
    console.log("");
    console.log(chalk.red.bold("——————————[BOTSONDISCORD]——————————"));
    if (apikey == "" || apikey == null) {
        return console.log(
            chalk.gray(
                `[BotsOnDiscord]: Not Setup, Please Set this up if Required?`
            )
        );
    } else {
        console.log(
            chalk.gray(
                `[BotsOnDiscord]: I have been setup, I refresh every 5 Minuteds on Site Provent API Floods`
            )
        );
        setInterval(() => {
            if (botReady) {
                let ondiscordpostreq = {
                    "guildCount": client1.guilds.cache.size
                };
            
                let ondiscordheaderreq = {
                    'Content-Type': 'application/json',
                    'Authorization': apikey
                };
            
                fetch(`https://bots.ondiscord.xyz/bot-api/bots/${client1.user.id}/guilds`, {
                    method: 'POST',
                    body: JSON.stringify(ondiscordpostreq),
                    headers: ondiscordheaderreq
                }).then(res => res.json()).then(json => {
                    console.log('[BotsOnDiscord]: Server count posted')
                });
            }
    
        }, 5 * 60 * 1000); // 5 Minutes
    }
}

async function discordlabs(apikey, client1, botReady) {
    console.log("");
    console.log(chalk.red.bold("——————————[DISCORDLABS]——————————"));
    if (apikey == "" || apikey == null) {
        return console.log(
            chalk.gray(
                `[DiscordLabs]: Not Setup, Please Set this up if Required?`
            )
        );
    } else {
        console.log(
            chalk.gray(
                `[DiscordLabs]: I have been setup, I refresh every 5 Minuteds on Site Provent API Floods`
            )
        );
        setInterval(() => {
            if (botReady) {
                let discordlabspostreq = {
                    "server_count": client1.guilds.cache.size
                };
            
                let discordlabsheaderreq = {
                    'Content-Type': 'application/json',
                    'Authorization': apikey
                };
            
                fetch(`https://bots.discordlabs.org/v2/bot/${client1.user.id}/stats`, {
                    method: 'POST',
                    body: JSON.stringify(discordlabspostreq),
                    headers: discordlabsheaderreq
                }).then(res => res.json()).then(json => {
                    console.log('[DiscordLabs]: Server count posted')
                });
            }
    
        }, 5 * 60 * 1000); // 5 Minutes
    }
}

async function discordbotlist(apikey, client1, botReady) {
    console.log("");
    console.log(chalk.red.bold("——————————[DISCORDBOTLIST]——————————"));
    if (apikey == "" || apikey == null) {
        return console.log(
            chalk.gray(
                `[DiscordBotList]: Not Setup, Please Set this up if Required?`
            )
        );
    } else {
        console.log(
            chalk.gray(
                `[DiscordBotList]: I have been setup, I refresh every 5 Minuteds on Site Provent API Floods`
            )
        );
        setInterval(() => {
            if (botReady) {
                let discordbotlistpostreq = {
                    "guilds": client1.guilds.cache.size
                };
            
                let discordbotlistheaderreq = {
                    'Content-Type': 'application/json',
                    'Authorization': apikey
                };
            
                fetch(`https://discordbotlist.com/api/v1/bots/${client1.user.id}/stats`, {
                    method: 'POST',
                    body: JSON.stringify(discordbotlistpostreq),
                    headers: discordbotlistheaderreq
                }).then(res => res.json()).then(json => {
                    console.log('[DiscordBotList]: Server count posted')
                });
            }
    
        }, 5 * 60 * 1000); // 5 Minutes
    }
}

async function botsgg(apikey, client1, botReady) {
    console.log("");
    console.log(chalk.red.bold("——————————[BOTS]——————————"));
    if (apikey == "" || apikey == null) {
        return console.log(
            chalk.gray(
                `[Bots]: Not Setup, Please Set this up if Required?`
            )
        );
    } else {
        console.log(
            chalk.gray(
                `[Bots]: I have been setup, I refresh every 5 Minuteds on Site Provent API Floods`
            )
        );
        setInterval(() => {
            if (botReady) {
                let botspostreq = {
                    "guildCount": client1.guilds.cache.size
                };
            
                let botsheaderreq = {
                    'Content-Type': 'application/json',
                    'Authorization': apikey
                };
            
                fetch(`https://discord.bots.gg/api/v1/bots/${client1.user.id}/stats`, {
                    method: 'POST',
                    body: JSON.stringify(botspostreq),
                    headers: botsheaderreq
                }).then(res => res.json()).then(json => {
                    console.log('[Bots]: Server count posted')
                });
            }
    
        }, 5 * 60 * 1000); // 5 Minutes
    }
}

async function voidbots(apikey, client1, botReady) {
    console.log("");
    console.log(chalk.red.bold("——————————[VOIDBOTS]——————————"));
    if (apikey == "" || apikey == null) {
        return console.log(
            chalk.gray(
                `[VoidBots]: Not Setup, Please Set this up if Required?`
            )
        );
    } else {
        console.log(
            chalk.gray(
                `[VoidBots]: I have been setup, I refresh every 5 Minuteds on Site Provent API Floods`
            )
        );
        setInterval(() => {
            if (botReady) {
                let voidbotspostreq = {
                    "server_count": client1.guilds.cache.size,
                    "shard_count": 0
                };
            
                let voidbotsheaderreq = {
                    'Content-Type': 'application/json',
                    'Authorization': apikey
                };
            
                fetch(`https://api.voidbots.net/bot/stats/${client1.user.id}`, {
                    method: 'POST',
                    body: JSON.stringify(voidbotspostreq),
                    headers: voidbotsheaderreq
                }).then(res => res.json()).then(json => {
                    console.log('[VoidBots]: Server count posted')
                });
            }
    
        }, 5 * 60 * 1000); // 5 Minutes
    }
}

async function vcodez(apikey, client1, botReady) {
    console.log("");
    console.log(chalk.red.bold("——————————[VCODEZ]——————————"));
    if (apikey == "" || apikey == null) {
        return console.log(
            chalk.gray(
                `[VCodez]: Not Setup, Please Set this up if Required?`
            )
        );
    } else {
        console.log(
            chalk.gray(
                `[VCodez]: I have been setup, I refresh every 5 Minuteds on Site Provent API Floods`
            )
        );
        setInterval(() => {
            if (botReady) {
            
                var bodycount = {
                    'serverCount': client1.guilds.cache.size
                }

                fetch(`https://topiclist.xyz/api/bots/${client1.user.id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': apikey
                    },
                    body: JSON.stringify(bodycount)
                }).then(res => res.json()).then(json => {
                    console.log('[VCodez]: Server count posted')
                });
             }
    
        }, 5 * 60 * 1000); // 5 Minutes
    }
}

client.on("ready", async () => {


        GuildChis = client.guilds.cache.get("914992174943313931");
        if (GuildChis) {
            ChannelChis = GuildChis.channels.cache.get("932601382618419220");
        }

        console.log("");
        console.log(chalk.red.bold("———————————————[Ready MSG]———————————————"));

        if (!ChannelChis) {
            console.log("");
            console.log(chalk.red.bold("——————————[SERVER CHECK]——————————"));
            console.log(
                chalk.gray(
                    `[Checking Support Server]: CHECKING BOT IN SUPPORT SERVER\n[ChisDiscord] A matching channel could not be found. Please check your DISCORD_SERVERID and DISCORD_CHANNELID environment variables.`
                )
            );
        } else {
            console.log("");
            console.log(chalk.red.bold("——————————[SERVER CHECK]——————————"));
            console.log(
                chalk.gray(
                    `[Checking Support Server]: CHECKING BOT IN SUPPORT SERVER\n[ChisDiscord] ${client.user.username} Discord BOT Ready Chis Discord!`
                )
            );
            botReady = true;
        }


        var blotlistapi = {
            "vortexlist": main_json.botlistapi.vortexlist.apitoken,
            "topgg": main_json.botlistapi.top.apitoken,
            "infinitybots": main_json.botlistapi.infinitybots.apitoken,
            "ondiscord": main_json.botlistapi.ondiscord.apitoken,
            "discordlabs": main_json.botlistapi.discordlabs.apitoken,
            "discordbotlist": main_json.botlistapi.discordbotlist.apitoken, 
            "botsgg": main_json.botlistapi.bots.apitoken, 
            "voidbots": main_json.botlistapi.voidbots.apitoken,
            "vcodez": main_json.botlistapi.vcodez.apitoken
        };

        if (botReady) {
            console.log("");
            console.log(chalk.red.bold("——————————[CHECK BOT LIST API]——————————"));
            console.log(
                chalk.gray(
                    `[BOT LIST API]: CHECKING BOT LISTS API IF VALID!`
                )
            );
            await vortexlist(blotlistapi.vortexlist, client, botReady);
            await topgglist(blotlistapi.topgg, client, botReady);
            await infinitybots(blotlistapi.infinitybots, client, botReady);
            await ondiscord(blotlistapi.ondiscord, client, botReady);
            await discordlabs(blotlistapi.discordlabs, client, botReady);
            await discordbotlist(blotlistapi.discordbotlist, client, botReady);
            await botsgg(blotlistapi.botsgg, client, botReady);
            await voidbots(blotlistapi.voidbots, client, botReady);
            await vcodez(blotlistapi.vcodez, client, botReady);
        }
    

        function postAllServersChis(embed, link) {
          const channelname = "chis-news";
          client.guilds.cache.map(guild => {
              var data = guild.channels.cache.find(channel => channel.name === channelname);
              if (data == undefined) {
                  return;
              } else {
                  const messageChannel = client.channels.cache.get(data.id);
                  messageChannel.send({
                      embeds: [embed]
                  }).then(() => {
                       console.log(`Sent message for new post ${link}`);
                  }).catch(err => {
                       console.log(embed, err);
                  });
              }
          });
      }
           
      const webhookcrypto = new WebhookClient({ url: '' });

      function postAllServersAlloy(embed, link) {
          const channelname = "alloy-news";
          client.guilds.cache.map(guild => {
              var data = guild.channels.cache.find(channel => channel.name === channelname);
              if (data == undefined) {
                  return;
              } else {
                  const messageChannel = client.channels.cache.get(data.id);
                  messageChannel.send({
                      embeds: [embed]
                  }).then(() => {
                       console.log(`Sent message for new post ${link}`);
                  }).catch(err => {
                       console.log(embed, err);
                  });
              }
          });
      }
      
      function postAllServersVIMM(embed, link) {
          const channelname = "vimm-news";
          client.guilds.cache.map(guild => {
              var data = guild.channels.cache.find(channel => channel.name === channelname);
              if (data == undefined) {
                  return;
              } else {
                  const messageChannel = client.channels.cache.get(data.id);
                  messageChannel.send({
                      embeds: [embed]
                  }).then(() => {
                       console.log(`Sent message for new post ${link}`);
                  }).catch(err => {
                       console.log(embed, err);
                  });
              }
          });
      }
      
      function postAllServersHelpieCaster(embed, link) {
          const channelname = "hc-news";
          client.guilds.cache.map(guild => {
              var data = guild.channels.cache.find(channel => channel.name === channelname);
              if (data == undefined) {
                  return;
              } else {
                  const messageChannel = client.channels.cache.get(data.id);
                  messageChannel.send({
                      embeds: [embed]
                  }).then(() => {
                       console.log(`Sent message for new post ${link}`);
                  }).catch(err => {
                       console.log(embed, err);
                  });
              }
          });
      }

  const supportServer = client.guilds.cache.get(`${main_json.TestingServerID}`);
  if (!supportServer) return console.log("");
  // ———————————————[Status]———————————————

  client.user.setActivity(`STARTING UP... || NEKO BOT || LOADING COMMANDS / MODULES`,
  { type: "WATCHING" })

        setInterval(() => {

            fetch(`https://api.chisdealhd.co.uk/v2/chisassets/chisvr/livestats`, {
                method: 'GET'
            }).then(res => res.json()).then(json => {
                
                if (json.twitch.online == true) {
                    client.user.setActivity(`[LIVE] ${json.twitch.title}`,
                    { type: "STREAMING", "url": "https://www.twitch.tv/chisvr" })
                } else if (json.vimm.online == true) {
                    client.user.setActivity(`[LIVE] ${json.vimm.title}`,
                    { type: "STREAMING", "url": "https://www.vimm.tv/c/chisdealhd" })
                } else if (json.youtube.online == true) {
                    client.user.setActivity(`[LIVE] ${json.youtube.title}`,
                    { type: "STREAMING", "url": `https://www.youtube.com/watch?v=${json.social.livestats.youtube.videoId}` })
                } else {

                    client.user.setActivity(`${prefix}help or /help || RAWR! || IM BIG CUTIE`,
                    { type: "WATCHING" })

                    setTimeout(function() {
                        client.user.setActivity(`${prefix}help or /help || NEKO BOT || MY MASTER IS A CUTIE!`,
                        { type: "WATCHING" })
                    }, 30000)

                    setTimeout(function() {
                        client.user.setActivity(`${prefix}help or /help || NEKO BOT || NOTICE ME SENPAI!!`,
                        { type: "WATCHING" })
                    }, 40000)

                    setTimeout(function() {
                        client.user.setActivity(`${prefix}help or /help || NEKO BOT || BOT Version 7.5 (BETA)`,
                        { type: "WATCHING" })
                    }, 50000)

                    setTimeout(function() {
                        client.user.setActivity(`${prefix}help or /help || NEKO BOT || Connected: ${client.guilds.cache.size} ${
                            client.guilds.cache.size > 1 ? "Servers" : "Server"
                        }`, { type: "WATCHING" })
                    }, 60000)

                    setTimeout(function() {
                        client.user.setActivity(`${prefix}help or /help || NEKO BOT || Surving: ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} ${
                            client.guilds.cache.reduce((a, b) => a + b.memberCount, 0) > 1
                            ? "Users,"
                            : "User,"
                        }`, { type: "WATCHING" })
                    }, 70000)

                    setTimeout(function() {
                        client.user.setActivity(`${prefix}help or /help || NEKO BOT || READD BOT FROM PROFILE OR "${prefix}invite" To enabled SLASH COMMANDS ON YOUR SERVER`,
                        { type: "WATCHING" })
                    }, 80000)

                    setTimeout(function() {
                        client.user.setActivity(`${prefix}help or /help || NEKO BOT || DONATE TO US KEEP OUR SERVERS ACTIVE ON OUR PATERON £1 a Month WITH PERKS ${prefix}patreon or /patreon in SERVERS`,
                        { type: "WATCHING" })
                    }, 90000)

                }

            });

        }, 100000)

        var connection = client.sqlconn;

        function getBlacklistServers() {
            return new Promise((resolve, reject) => {
                connection.query(`SELECT * FROM guild_blacklist WHERE active='1'`, (err, rows) => {
                    if (err) return reject(err);
    
                    resolve(rows);
                });
            });
        }
    
        function getBlacklistUsers() {
            return new Promise((resolve, reject) => {
                connection.query(`SELECT * FROM profile_blacklist WHERE active='1'`, (err, rows) => {
                    if (err) return reject(err);
    
                    resolve(rows);
                });
            });
        }

        const BlacklistServers = await getBlacklistServers().catch(console.error);
    const BlacklistUsers = await getBlacklistUsers().catch(console.error);

    if (BlacklistServers.length == 0) {
        var blockservers = 0;
    } else {
       var blockservers = BlacklistServers.length;
    }

    if (BlacklistUsers.length == 0) {
        var blockusers = 0;
    } else {
       var blockusers = BlacklistUsers.length;
    }

  // ———————————————[Ready MSG]———————————————
  console.log("");
  console.log(chalk.red.bold("——————————[BOT DETAILS]——————————"));
  console.log(chalk.gray("Connected To"), chalk.yellow(`${client.user.tag}`));
  console.log(
    chalk.white("Watching"),
    chalk.red(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}`),
    chalk.white(
      `${
        client.guilds.cache.reduce((a, b) => a + b.memberCount, 0) > 1
          ? "Users,"
          : "User,"
      }`
    ),
    chalk.red(`${client.guilds.cache.size}`),
    chalk.white(`${client.guilds.cache.size > 1 ? "Servers," : "Server,"}`),
    chalk.red(`${blockusers}`),
    chalk.white(`${blockusers > 1 ? "Blocked Users," : "Blocked User,"}`),
    chalk.red(`${blockservers}`),
    chalk.white(`${blockservers > 1 ? "Blocked Servers." : "Blocked Server."}`)
  );
  console.log(
    chalk.white(`Prefix:` + chalk.red(` ${prefix}`)),
    chalk.white("||"),
    chalk.red(`${client.commands.size}`),
    chalk.white(`Commands`),
    chalk.white("||"),
    chalk.red(`${client.slashCommands.size}`),
    chalk.white(`Slash Commands`)
  );
  console.log(
    chalk.white(`Support-Server: `) +
      chalk.red(`${supportServer.name || "None"}`)
  );
  console.log("");
  console.log(chalk.red.bold("——————————[Statistics]——————————"));
  console.log(
    chalk.gray(
      `Discord.js Version: ${discordjsVersion}\nRunning on Node ${process.version} on ${process.platform} ${process.arch}`
    )
  );
  console.log(
    chalk.gray(
      `Memory: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(
        2
      )} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
        2
      )} MB`
    )
  );
});
