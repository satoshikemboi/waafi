import mongoose from "mongoose";

const loanSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
  },
  { timestamps: true }
);

export default mongoose.model("Loan", loanSchema);