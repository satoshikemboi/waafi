import https from "https";

export const sendTelegramMessage = async (message) => {
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  const data = JSON.stringify({
    chat_id: CHAT_ID,
    text: message,
  });

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(data),
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let body = "";

      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        console.log("Telegram response:", body);
        resolve(body);
      });
    });

    req.on("error", (err) => {
      console.log("HTTPS error:", err.message);
      reject(err);
    });

    req.write(data);
    req.end();
  });
};