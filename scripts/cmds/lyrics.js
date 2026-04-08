const axios = require("axios");

const baseApiUrl = async () => {
  const base = await axios.get(
    `https://noobs-api-team-url.vercel.app/N1SA9/baseApiUrl.json`,
  );
  return base.data.api;
};

module.exports = {
  config: {
    name: "lyrics",
    version: "1.0",
    author: "dipto",
    countDown: 5,
    role: 0,
    description:"Get song lyrics with their Images",
    category: "Song Lyrics",
    guide: "{pn} <song name>"
  },

onStart: async ({ message, args }) => {
    try {
      const songs = args.join(' ');
      if (!songs) {
        return message.reply("Please provide a song name!");
      }
      const res = await axios.get(`${await baseApiUrl()}/lyrics2?songName=${encodeURIComponent(songs)}`);
      const data = res.data;
      if (!data.title || !data.artist || !data.lyrics) {
        return message.reply("An error occurred while fetching lyrics!");
      }

      const songMessage = { 
        body: `❏♡𝐒𝐨𝐧𝐠 𝐓𝐢𝐭𝐥𝐞: ${data.title}\n\n❏♡𝐀𝐫𝐭𝐢𝐬𝐭: ${data.artist}\n\n❏♡𝐒𝐨𝐧𝐠 𝐋𝐲𝐫𝐢𝐜𝐬:\n\n${data.lyrics}` 
      };

      if (data.image) {
        return message.stream({url:data.image, caption:songMessage})
      }else{
        message.reply(songMessage)
      }
    } catch (error) {
    message.reply("error: " + error.message);
    }
  }
};
