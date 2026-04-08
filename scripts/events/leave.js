const fs = require("fs-extra");
const path = require("path");
const Canvas = require("canvas");

module.exports = {
  onChat: async ({ bot, msg }) => {
    try {
      if (!msg.left_chat_member) return;

      const leftMember = msg.left_chat_member.first_name || "User";
      const chatName = msg.chat.title || "this group";

      const canvas = Canvas.createCanvas(1100, 650);
      const ctx = canvas.getContext("2d");

      // 🎨 BACKGROUND
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 🌈 BORDER GRADIENT
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "#ff0000");
      gradient.addColorStop(0.5, "#ff00ff");
      gradient.addColorStop(1, "#ff8800");

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 8;
      ctx.shadowColor = "#ff0000";
      ctx.shadowBlur = 20;
      ctx.strokeRect(20, 20, 1060, 610);
      ctx.shadowBlur = 0;

      // 💠 GLASS PANEL
      ctx.fillStyle = "rgba(255,255,255,0.05)";
      ctx.fillRect(40, 40, 1020, 570);

      // 🧾 TITLE
      ctx.fillStyle = "#ff4d4d";
      ctx.font = "bold 55px Arial";
      ctx.fillText("MEMBER LEFT ALERT", 70, 110);

      // 💔 MAIN TEXT
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 40px Arial";
      ctx.fillText(`${leftMember}`, 90, 220);

      ctx.fillStyle = "#ffcc00";
      ctx.font = "30px Arial";
      ctx.fillText("has left the group", 90, 280);

      ctx.fillStyle = "#00f0ff";
      ctx.font = "28px Arial";
      ctx.fillText(`Group: ${chatName}`, 90, 340);

      // 😢 RANDOM STYLE MESSAGE
      const msgs = [
        "Goodbye legend 💔",
        "We will miss you 🥀",
        "Left like a ghost 👻",
        "Mission completed 🚪",
        "Gone but not forgotten 💭"
      ];

      const randomMsg = msgs[Math.floor(Math.random() * msgs.length)];

      ctx.fillStyle = "#00ff88";
      ctx.font = "italic 30px Arial";
      ctx.fillText(randomMsg, 90, 420);

      // 💀 BIG ICON TEXT
      ctx.fillStyle = "#ff0000";
      ctx.font = "bold 120px Arial";
      ctx.fillText("👋", 820, 350);

      // 🔥 FOOTER
      ctx.fillStyle = "#aaaaaa";
      ctx.font = "20px Arial";
      ctx.fillText("Powered by N1SA9 EDITZ BOT SYSTEM", 90, 600);

      // 📁 SAVE FILE
      const filePath = path.join(__dirname, "cache", `leave_${msg.chat.id}.png`);
      fs.ensureDirSync(path.join(__dirname, "cache"));

      fs.writeFileSync(filePath, canvas.toBuffer());

      // 📤 SEND
      bot.sendMessage(
        msg.chat.id,
        {
          caption: `👋 ${leftMember} left the group`,
          attachment: fs.createReadStream(filePath)
        },
        () => {
          fs.unlinkSync(filePath);
        }
      );

    } catch (e) {
      console.log(e);
      bot.sendMessage(msg.chat.id, "❌ Leave card generate error!");
    }
  }
};
