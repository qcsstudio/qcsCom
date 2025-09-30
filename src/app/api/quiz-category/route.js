import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import QuizCategory from "@/models/quizCategory";
export async function POST(req) {
    try {
        await connectMongo();
        const body = await req.json();
        const { title, description } = body;
        if (!title) {
            return NextResponse.json(
                { message: "Category title is required" },
                { status: 400 }
            );
        }
        const category = await QuizCategory.create({
            title,
            description,
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