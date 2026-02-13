import mongoose from "mongoose";
const answerSchema = new mongoose.Schema({
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "quizQuestion",
    required: true,
  },
  selected_option: {
    type: String, // "A", "B", "C", "D"
    required: true,
  },
  is_correct: {
    type: Boolean,
    required: true,
  },
});
const resultSchema = new mongoose.Schema({
  candidate_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "QuizCategory",
    required: true,
  },
  answers: [answerSchema],
  total_questions: Number,
  correct_answers: Number,
  wrong_answers: Number,
  percentage: Number,
  grade: String,
  attempted_on: {
    type: Date,
    default: Date.now,
  },
});
resultSchema.pre("save", function (next) {
  this.total_questions = this.answers.length;
  this.correct_answers = this.answers.filter(a => a.is_correct).length;
  this.wrong_answers = this.total_questions - this.correct_answers;
  this.percentage = ((this.correct_answers / this.total_questions) * 100).toFixed(2);
  if (this.percentage >= 90) this.grade = "A";
  else if (this.percentage >= 75) this.grade = "B";
  else if (this.percentage >= 60) this.grade = "C";
  else if (this.percentage >= 40) this.grade = "D";
  else this.grade = "F";
  next();
});
export default mongoose.models.Quizresult || mongoose.model("Quizresult", resultSchema);