import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import quizQuestions from "@/models/quizQuestion";
export async function POST(req) {
    try {
        await connectMongo();
        const body = await req.json();
        const { question_text, options,category_id, level} = body;
        if (!question_text) {
            return NextResponse.json(
                { message: "Category question_text is required" },
                { status: 400 }
            );
        }
        const category = await quizQuestions.create({
            level:level,
            category_id:category_id,
            question_text,
            options:options,
        });
        return NextResponse.json(
            {
                message: "Category created successfully",
                category_data: category,
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