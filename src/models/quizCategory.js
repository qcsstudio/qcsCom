import mongoose from "mongoose";
const quizCategory = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true
        },
        description: String
    },
    {
        timestamps: true,
    }
);
export default mongoose.models.quizCategory || mongoose.model("quizCategory", quizCategory);