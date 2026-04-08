module.exports = {
    config: {
        name: "start",
        version: "1.0",
        author: "NisaN",
        role: 0,
        category: "system"
    },

    onStart: async function ({ bot, event }) {
        const msg = `Hello! I'm ${bot.username}, the bot. How can I assist you today?`;

        bot.sendMessage(event.chat.id, msg, {
            reply_markup: {
                keyboard: [
                    [{ text: "/start" }]
                ],
                resize_keyboard: true
            }
        });
    }
};
