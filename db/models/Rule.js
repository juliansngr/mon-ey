import mongoose from "mongoose";

const { Schema } = mongoose;

const ruleSchema = new Schema({
  description: { type: String, required: true },
  preconditions: [
    {
      id: { type: String, required: false },
      object: { type: String, required: false },
      operator: { type: String, required: false },
      pattern: { type: [String], required: false },
      connectOperator: { type: String, required: false },
      connectId: { type: String, required: false },
    },
  ],
  consequences: {
    object: { type: String, required: true },
    operator: { type: String, required: true },
    value: { type: [String], required: true },
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

const Rule = mongoose.models.Rule || mongoose.model("Rule", ruleSchema);

export default Rule;
