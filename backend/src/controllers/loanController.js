import Loan from "../models/Loan.js";
import { sendTelegramMessage } from "../../services/telegramService.js";

export const applyLoan = async (req, res) => {
  try {
    const { firstName, lastName, email, phone } = req.body;

    const loan = await Loan.create({
      firstName,
      lastName,
      email,
      phone,
    });

    // 🔥 FORMAT TELEGRAM MESSAGE
    const message = `
📢 NEW LOAN APPLICATION

👤 Name: ${firstName} ${lastName}
📧 Email: ${email}
📞 Phone: ${phone}
🆔 Loan ID: ${loan._id}
    `;

    // 🔥 SEND TO TELEGRAM
    await sendTelegramMessage(message);

    res.status(201).json({
      success: true,
      loan,
    });
  } catch (err) {
    console.log("Loan error:", err.message);

    res.status(500).json({ message: err.message });
  }
};

export const getLoans = async (req, res) => {
  try {
    const loans = await Loan.find();
    res.json(loans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};