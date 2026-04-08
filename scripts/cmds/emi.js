const axios = require('axios');
const baseApiUrl = async () => {
  const base = await axios.get(
    `https://noobs-api-team-url.vercel.app/N1SA9/baseApiUrl.json`,
  );
  return base.data.api;
};
module.exports = {
  config: {
    name: "emi",
    aliases: [],
    version: "6.9.0",
    author: "dipto",
    countDown: 10,
    role: 0,
    description: "Generate image by Emi",
    category: "imagination",
    guide: "{pn} [prompt]",
  },
  onStart: async({ args, message })=>{
    try {
      const prompt = args.join(" ");
      if (!prompt) {
        return message.reply("Please provide a prompt.");
      }
      const wait = await message.reply("𝗪𝗮𝗶𝘁 𝗸𝗼𝗿𝗼 𝗕𝗮𝗯𝘆 <😘");
      const response = `${await baseApiUrl()}/emi?prompt=${encodeURIComponent(prompt)}`;
      
      await message.download({url:response, caption: `✅ | Generated your images`,mimeType: "image/jpeg"});
         message.unsend(wait.message_id);
    } catch (e) {
      console.error(e);
      await message.reply(`Failed to genarate photo!!!!\nError: ${e.message}`);
    }
  },
};
