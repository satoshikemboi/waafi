import mongoose from "mongoose";

const loanSchema = new mongoose.Schema(
  {
    userId: String,
    amount: Number,
    period: Number,
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Loan", loanSchema);