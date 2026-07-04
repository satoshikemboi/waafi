import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

import authRoutes from "./routes/authRoutes.js";
import loanRoutes from "./routes/loanRoutes.js";
import otpRoutes from "./routes/otpRoutes.js";

app.use("/api/auth", authRoutes);
app.use("/api/loan", loanRoutes);
app.use("/api/otp", otpRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Waafi API Running 🚀" });
});

export default app;