import connectMongo from "@/lib/mongodb";
import Question from '@/models/question'


export async function PUT(req) {
  const id = req.nextUrl.pathname.split('/')[3];  

  try {
    await connectMongo();
    const updatedData = await req.json();

    const updatedQuestion = await Question.findByIdAndUpdate(
         id, 
         updatedData, {
      new: true, 
    });

    if (!updatedQuestion) {
      return new Response(
        JSON.stringify({ success: false, message: "Question not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: updatedQuestion }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}


export async function DELETE(req) {
    const id = req.nextUrl.pathname.split('/')[3];  
    try {
      await connectMongo();
        const deletedQuestion = await Question.findByIdAndDelete(id);
  
      if (!deletedQuestion) {
        return new Response(
          JSON.stringify({ success: false, message: "Question not found" }),
          { status: 404 }
        );
      }
  
      return new Response(
        JSON.stringify({ success: true, message: "Question deleted successfully" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }