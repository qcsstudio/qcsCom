import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import QuizQuestion from "@/models/quizQuestion";
export async function GET(req) {
    try {
        await connectMongo()
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        const page = parseInt(searchParams.get("page") || "1");
        const limit = 4;
        const skip = (page - 1) * limit;
        const totalDocs = await QuizQuestion.countDocuments({ category_id: id });
        const totalPages = Math.ceil(totalDocs / limit);
        const categoriesList = await QuizQuestion.find({
            category_id: id
        }).skip(skip)
            .limit(limit);
        return NextResponse.json(
            {
                message: "Category created successfully",
                data: categoriesList,
                totalPage:totalPages
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