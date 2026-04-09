const axios = require("axios");

let BASE_URL;

(async () => {
  try {
    const res = await axios.get(
      `https://noobs-api-team-url.vercel.app/N1SA9/baseApiUrl.json`
    );

    BASE_URL = res.data.mahmud;
  } catch (e) {
    console.log("BASE_URL LOAD ERROR:", e.message);
  }
})();

const keywords = [
  "baby", "bby", "babu", "bbu", "jan", "bot",
  "জান", "জানু", "বেবি", "wifey", "kurumi"
];

module.exports = {
  config: {
    name: "kurumi",
    aliases: ["baby", "bby", "bbu", "jan", "janu", "wifey", "bot"],
    version: "1.0",
    author: "MahMUD",
    role: 0,
    category: "chat"
  },

  onStart: async ({ bot, msg, message, args }) => {
    const text = args.join(" ").toLowerCase();
    const userId = msg.from.id;

    try {
      if (!args[0]) {
        const ran = ["Bolo baby 😘", "I love you ❤️", "Type -bby hi"];
        return message.reply(ran[Math.floor(Math.random() * ran.length)]);
      }

      if (!BASE_URL) return message.reply("⚠️ API loading, try again");

      if (args[0] === "teach") {
        const data = text.replace("teach ", "").split(" - ");
        if (data.length < 2)
          return message.reply("❌ teach [question] - [reply]");

        const res = await axios.post(`${BASE_URL}/api/jan/teach`, {
          trigger: data[0],
          responses: data[1],
          userID: userId
        });

        return message.reply(`✅ Added: ${res.data.count}`);
      }

      if (args[0] === "remove") {
        const data = text.replace("remove ", "").split(" - ");
        if (data.length < 2)
          return message.reply("❌ remove [question] - [index]");

        const res = await axios.delete(`${BASE_URL}/api/jan/remove`, {
          data: { trigger: data[0], index: parseInt(data[1]) }
        });

        return message.reply(res.data.message);
      }

      let userText = text;
      if (!userText || userText.trim() === "") userText = "hi";

      const res = await axios.post(`${BASE_URL}/api/hinata`, {
        text: userText,
        style: 3
      });

      if (!res.data?.message)
        return message.reply("⚠️ No response from API");

      return message.reply(res.data.message);

    } catch (err) {
      console.log("START ERROR:", err.response?.data || err.message);
      return message.reply("❌ API Error!");
    }
  },

  onChat: async ({ bot, msg }) => {
    try {
      if (!BASE_URL) return;

      const text = msg.text?.toLowerCase() || "";

      const isReply = msg.reply_to_message || msg.reply_to_message_id;

      if (isReply) {
        const userText = msg.text || "hi";

        const res = await axios.post(`${BASE_URL}/api/hinata`, {
          text: userText,
          style: 3
        });

        if (!res.data?.message) return;

        return bot.sendMessage(msg.chat.id, res.data.message, {
          reply_to_message_id: msg.message_id
        });
      }

      if (!keywords.some(k => text.startsWith(k))) return;

      let userText = text.split(" ").slice(1).join(" ");
      if (!userText || userText.trim() === "") userText = "hi";

      const res = await axios.post(`${BASE_URL}/api/hinata`, {
        text: userText,
        style: 3
      });

      if (!res.data?.message) return;

      bot.sendMessage(msg.chat.id, res.data.message, {
        reply_to_message_id: msg.message_id
      });

    } catch (e) {
      console.log("CHAT ERROR:", e.response?.data || e.message);
    }
  }
};
