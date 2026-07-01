import TelegramBot from "node-telegram-bot-api";

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);

export const sendTelegramMessage = async (message) => {
  try {
    await bot.sendMessage(process.env.TELEGRAM_CHAT_ID, message);
  } catch (err) {
    console.log("Telegram error:", err.message);
  }
};