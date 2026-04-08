const fs = require("fs-extra");
const path = require("path");
const Canvas = require("canvas");

module.exports = {
  onChat: async ({ bot, msg }) => {
    try {
      if (!msg.new_chat_members) return;

      const newMembers = msg.new_chat_members;
      const chatName = msg.chat.title || "this group";

      for (const member of newMembers) {
        const name = member.first_name || "User";

        // 👤 GET PROFILE PHOTO (TELEGRAM)
        let avatarUrl = null;

        try {
          const photos = await bot.getUserProfilePhotos(member.id, 0, 1);
          if (photos.total_count > 0) {
            const fileId = photos.photos[0][0].file_id;
            const file = await bot.getFile(fileId);
            avatarUrl = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${file.file_path}`;
          }
        } catch (e) {
          avatarUrl = null;
        }

        const canvas = Canvas.createCanvas(1100, 650);
        const ctx = canvas.getContext("2d");

        // 🎨 BACKGROUND
        ctx.fillStyle = "#0a0a0a";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 🌈 BORDER
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, "#00ff88");
        gradient.addColorStop(0.5, "#00f0ff");
        gradient.addColorStop(1, "#00ffcc");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 8;
        ctx.strokeRect(20, 20, 1060, 610);

        // 💠 GLASS
        ctx.fillStyle = "rgba(255,255,255,0.05)";
        ctx.fillRect(40, 40, 1020, 570);

        // 🧾 TITLE
        ctx.fillStyle = "#00ff88";
        ctx.font = "bold 55px Arial";
        ctx.fillText("WELCOME TO GROUP", 70, 110);

        // 👤 NAME
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 40px Arial";
        ctx.fillText(name, 90, 220);

        // 📦 GROUP NAME
        ctx.fillStyle = "#00f0ff";
        ctx.font = "30px Arial";
        ctx.fillText(`Group: ${chatName}`, 90, 290);

        // 🎉 RANDOM MSG
        const msgs = [
          "Welcome legend 🚀",
          "Glad to have you here 💚",
          "Enjoy your stay 😎",
          "New member detected 👀",
          "Let’s build something awesome ⚡"
        ];

        ctx.fillStyle = "#ffcc00";
        ctx.font = "italic 32px Arial";
        ctx.fillText(msgs[Math.floor(Math.random() * msgs.length)], 90, 370);

        // 🎉 BIG ICON
        ctx.font = "bold 120px Arial";
        ctx.fillText("🎉", 820, 350);

        // 🔥 FOOTER
        ctx.fillStyle = "#aaaaaa";
        ctx.font = "20px Arial";
        ctx.fillText("Powered by N1SA9 EDITZ BOT SYSTEM", 90, 600);

        // 👤 DRAW AVATAR (CIRCLE)
        if (avatarUrl) {
          try {
            const avatar = await Canvas.loadImage(avatarUrl);

            ctx.save();
            ctx.beginPath();
            ctx.arc(850, 320, 120, 0, Math.PI * 2);
            ctx.clip();
            ctx.drawImage(avatar, 730, 200, 240, 240);
            ctx.restore();

            ctx.strokeStyle = "#00ff88";
            ctx.lineWidth = 8;
            ctx.beginPath();
            ctx.arc(850, 320, 125, 0, Math.PI * 2);
            ctx.stroke();
          } catch (e) {}
        }

        const filePath = path.join(__dirname, "cache", `welcome_${member.id}.png`);
        fs.ensureDirSync(path.join(__dirname, "cache"));
        fs.writeFileSync(filePath, canvas.toBuffer());

        // 🎛️ INLINE BUTTON (HELP)
        const buttons = {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "📖 HELP",
                  callback_data: "help_cmd"
                }
              ]
            ]
          }
        };

        bot.sendMessage(
          msg.chat.id,
          {
            caption: `🎉 Welcome ${name} to ${chatName}`,
            attachment: fs.createReadStream(filePath),
            ...buttons
          },
          () => {
            fs.unlinkSync(filePath);
          }
        );
      }

    } catch (e) {
      console.log(e);
      bot.sendMessage(msg.chat.id, "❌ Welcome system error!");
    }
  }
};
