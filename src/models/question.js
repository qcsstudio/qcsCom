import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
  },
  option_a: {
    type: String,
  },
  option_b: {
    type: String,
  },
  option_c: {
    type: String,
  },
  option_d: {
    type: String,
  },
  option_e: {
    type: String,
  },
}, { timestamps: true });

export default mongoose.models.Question || mongoose.model("Question", QuestionSchema);