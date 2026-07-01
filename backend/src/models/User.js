import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    password: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);