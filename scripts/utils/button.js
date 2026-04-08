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
    }
};
