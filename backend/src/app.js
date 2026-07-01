import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

import authRoutes from "./routes/authRoutes.js";
import loanRoutes from "./routes/loanRoutes.js";

app.use("/api/auth", authRoutes);
app.use("/api/loans", loanRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Waafi API Running 🚀" });
});

export default app;