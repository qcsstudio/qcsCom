import { NextResponse } from "next/server";
import connectMongo from '@/lib/mongodb';
import candidate from "@/models/candidate";
export async function POST(req) {
    try {
        await connectMongo();
        const data = await req.json();
        console.log(data, "4444444444")
        if (!data.email) {
            return NextResponse.json({ error: 'Email Is Required' }, { status: 404 });
        }
        const candidateData = await candidate.create({
            fullName: data?.fullName,
            email: data?.email,
            contact_Number: data?.contact_Number,
            address: data?.address,
            collegeName: data?.collegeName,
            course: data?.POSTcourse,
            carrer_option: data?.carrer_option

        })
        
        return NextResponse.json({ candidateData }, { status: 201 });


    } catch (error) {
        console.log("Candtii", error)
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(req) {
  try {
    await connectMongo();

    const { searchParams } = new URL(req.url); 
    const id = searchParams.get("id"); 
console.log(searchParams,"ididididididid")
    const candidateData = await candidate.findById(id);

    if (!candidateData) {
      return NextResponse.json({ error: "Candidate not found" }, { status: 404 });
    }

    return NextResponse.json({ candidateData }, { status: 200 });
  } catch (error) {
    console.error("Error fetching candidate:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}