module.exports = {
    onChat: async ({ bot, msg }) => {
        if (msg.new_chat_members) {
            const newMembers = msg.new_chat_members.map(member => member.first_name).join(', ');
            const chatName = msg.chat.title || 'this group';

            const messages = [
                `Welcome ${newMembers} to ${chatName}!`,
                `Hey ${newMembers}, welcome to ${chatName} 🎉`,
                `${newMembers} joined ${chatName} 🚀`,
                `Glad to have you here ${newMembers} 😎`,
                `${newMembers} just entered ${chatName} 👀`,
                `Everyone welcome ${newMembers} to ${chatName} 💚`,
                `${newMembers} is now part of ${chatName} 🥳`
            ];

            const welcomeMessage = messages[Math.floor(Math.random() * messages.length)];

            bot.sendMessage(msg.chat.id, welcomeMessage);
        }
    }
};
