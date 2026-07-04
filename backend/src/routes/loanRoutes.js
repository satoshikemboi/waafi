import express from "express";
import { applyLoan, getLoans } from "../controllers/loanController.js";

const router = express.Router();

router.post("/apply", applyLoan);
router.get("/all", getLoans);

export default router;