import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import quizResult from "@/models/quizResult";
export async function POST(req) {
    try {
        await connectMongo();
        const body = await req.json();
        const { candidate_id, category_id,answers } = body;
        if (!candidate_id || !category_id) {
            return NextResponse.json(
                { message: "candidate_id, category_id, total_questions, and correct_answers are required" },
                { status: 400 }
            );
        }
        const result = await quizResult.create({
            candidate_id,
            category_id,
            answers
        });
        return NextResponse.json(
            {
                message: "Result saved successfully",
                result_data: {
                    total_questions: result.total_questions,
                    correct_answers: result.correct_answers,
                    wrong_answers: result.wrong_answers,
                    percentage: result.percentage,
                    grade: result.grade,
                    attempted_on: result.attempted_on
                }
            },
            { status: 201 }
        );
    } catch (error) {
        console.log("Category Error:", error);
        return NextResponse.json(
            { message: "Category creation failed", error: error.message },
            { status: 500 }
        );
    }
}









