import { NextResponse } from "next/server";
import connectMongo from '@/lib/mongodb';
import jobs from "@/models/jobs";

export async function GET(){
    try {
        await connectMongo();
        const job = await jobs.find({}).sort({createdAt:-1});
        return NextResponse.json(job,{status:200})
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
 
    }
}

export async function POST(req) {
    try {
        await connectMongo();
        const data = await req.json();
        if(!data.heading || !data.location || !data.experience || !data.skills ||!data.description || !data.workHours){
            return NextResponse.json({ error: 'Missing heading or content' }, { status: 404 });
        }
        const newjob = new jobs(data);
        await newjob.save();

        return NextResponse.json({newjob},{status:201});


    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
    }
}