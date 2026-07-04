import express from "express";
import {
  storeOtp,
  verifyOtp,
  checkOtpStatus,
} from "../controllers/otpController.js";

const router = express.Router();

// store OTP
router.post("/store-otp", storeOtp);

// verify OTP
router.post("/verify-otp", verifyOtp);

// check status (optional)
router.get("/status/:phone", checkOtpStatus);

export default router;