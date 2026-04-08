module.exports = {
    mainMenu: () => {
        return {
            reply_markup: {
                keyboard: [
                    [
                        { text: "/start" },
                        { text: "/help" }
                    ]
                ],
                resize_keyboard: true
            }
        };
    },

    // 🎛️ INLINE BUTTON (WELCOME / HELP SYSTEM এর জন্য)
    welcomeButtons: () => {
        return {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "📖 HELP",
                            callback_data: "help_cmd"
                        }
                    ],
                    [
                        {
                            text: "🤖 START",
                            callback_data: "start_cmd"
                        }
                    ]
                ]
            }
        };
    },

    // ⚡ SIMPLE HELP BUTTON ONLY
    helpButton: () => {
        return {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "📖 Open Help",
                            callback_data: "help_cmd"
                        }
                    ]
                ]
            }
        };
    }
};
