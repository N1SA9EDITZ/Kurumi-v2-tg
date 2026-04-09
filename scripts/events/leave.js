module.exports = {
    onChat: async ({ bot, msg }) => {
        if (msg.left_chat_member) {
            const leftMember = msg.left_chat_member.first_name;
            const chatName = msg.chat.title || 'this group';

            const messages = [
                `${leftMember} has left ${chatName}.`,
                `${leftMember} just left the group 👋`,
                `Goodbye ${leftMember}, you left ${chatName} 😢`,
                `${leftMember} is no longer in ${chatName} 💔`,
                `${leftMember} left like a ninja 🥷`,
                `${leftMember} said bye to ${chatName} 🚪`,
                `${leftMember} vanished from ${chatName} 👻`
            ];

            const leaveMessage = messages[Math.floor(Math.random() * messages.length)];

            bot.sendMessage(msg.chat.id, leaveMessage);
        }
    }
};
