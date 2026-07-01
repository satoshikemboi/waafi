import Loan from "../models/Loan.js";
import { sendTelegramMessage } from "../services/telegramService.js";

export const applyLoan = async (req, res) => {
  const { userId, amount, period } = req.body;

  const loan = await Loan.create({
    userId,
    amount,
    period,
  });

  await sendTelegramMessage(
    `📢 New Loan Application\n💰 Amount: ${amount}\n📆 Period: ${period} months`
  );

  res.json(loan);
};

export const getLoans = async (req, res) => {
  const loans = await Loan.find();
  res.json(loans);
};