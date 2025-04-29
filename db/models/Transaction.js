import mongoose from "mongoose";

const { Schema } = mongoose;

const transactionSchema = new Schema({
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  type: { type: String, required: true },
  date: { type: String, required: true },
  partner: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  transactionId: { type: String, required: false },
});

const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);

export default Transaction;
