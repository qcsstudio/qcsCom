import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import QuizQuestion from "@/models/quizQuestion";
export async function GET(req) {
    try {
        await connectMongo()
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        const categoriesList = await QuizQuestion.find({
            category_id: id
        })
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