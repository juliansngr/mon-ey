import mongoose from "mongoose";

const BankConnectionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  requisitionId: { type: String, required: true, unique: true },
  institutionId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.BankConnection ||
  mongoose.model("BankConnection", BankConnectionSchema);
