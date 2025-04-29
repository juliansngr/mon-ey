import mongoose from "mongoose";

const { Schema } = mongoose;

const transactionSchema = new Schema({
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  type: { type: String, required: true },
  date: { type: String, required: true },
  partner: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

// Check if the model already exists to avoid recompilation errors
// This is important when using hot module replacement (HMR) in development
const Transaction =
  mongoose.models.Transactions || mongoose.model("Transactions", transactionSchema);

export default Transaction;
