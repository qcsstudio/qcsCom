import connectMongo from "@/lib/mongodb";
import Question from "@/models/question";

export async function POST(req) {
  await connectMongo();

  try {
    const body = await req.json();
    const question = await Question.create(body);

    return new Response(JSON.stringify({ success: true, data: question }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function GET(req) {
    try {
      await connectMongo();
      const questions = await Question.find();
  
      return new Response(JSON.stringify({ success: true, data: questions }), {
        status: 200, 
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        {
          status: 500, // Use 500 for internal server errors
          headers: { "Content-Type": "application/json" },
        }
      );
    }
}