import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import QuizCategory from "@/models/quizCategory";
export async function GET(req) {
    try {
        await connectMongo()
        const categoriesList = await QuizCategory.find()
        return NextResponse.json(
            {
                message: "Category created successfully",
                data: categoriesList,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Category Error:", error);
        return NextResponse.json(
            { message: "Category creation failed", error: error.message },
            { status: 500 }
        );
    }
}