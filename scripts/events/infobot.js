module.exports = {
    onChat: async ({ bot, msg }) => {
        if (msg.new_chat_member && msg.new_chat_member.id === bot.id) {
            const infoMessage = `Hello! I'm ${bot.username}, the bot 🤖\nClick Start button below 👇`;

            bot.sendMessage(msg.chat.id, infoMessage, {
                reply_markup: {
                    keyboard: [
                        [{ text: "/start" }]
                    ],
                    resize_keyboard: true
                }
            });
        }
    }
};
