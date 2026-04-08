const buttons = require("../utils/button");

module.exports = {
    onChat: async ({ bot, msg }) => {
        const text = msg.text?.toLowerCase();

        // START
        if (text === "/start") {
            return bot.sendMessage(
                msg.chat.id,
                `Hello! I'm ${bot.username} 🤖`,
                buttons.mainMenu()
            );
        }

        // HELP
        if (text === "/help") {
            return bot.sendMessage(
                msg.chat.id,
                `🤖 Help Menu

/start - Start
/help - Help`,
                buttons.mainMenu()
            );
        }

        // BOT ADD
        if (msg.new_chat_member && msg.new_chat_member.id === bot.id) {
            return bot.sendMessage(
                msg.chat.id,
                `Hello! I'm ${bot.username} 🤖\nClick below 👇`,
                buttons.mainMenu()
            );
        }
    }
};
