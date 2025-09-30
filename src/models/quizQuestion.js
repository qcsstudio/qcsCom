const mongoose = require("mongoose");
const optionSchema = new mongoose.Schema({
  option_id: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  is_correct: {
    type: Boolean,
    default: false
  }
});
const questionSchema = new mongoose.Schema({
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "quizCategory",
    required: true
  },
  level: {
    type: String,
    required: true
  },
  question_text: {
    type: String,
    required: true
  },
  options: {
    type: [optionSchema],
    validate: [arrayLimit, "{PATH} must have at least 2 options"]
  },
}, {
  timestamps: true
});
function arrayLimit(val) {
  return val.length >= 2;
}
export default mongoose.models.quizQuestion || mongoose.model("quizQuestion", questionSchema);