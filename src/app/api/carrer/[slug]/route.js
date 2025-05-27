import { NextResponse } from "next/server";
import connectMongo from '@/lib/mongodb';
import jobs from "@/models/jobs";


export async function GET(req,{ params }) {
  const { slug } =   params;
        try {
            connectMongo();
            const job = await jobs.findOne({heading: decodeURIComponent(slug)});
            if (!job) {
            return NextResponse.json({ error: 'job not found' }, { status: 404 });
                }
                 return NextResponse.json(job, { status: 200 });
        } catch (error) {
            console.error('GET error:', error);
            return NextResponse.json({ error: 'Failed to fetch job', message: error.message }, { status: 500 });
        }
}

export async function PUT (req,{params}){

    const {slug} = params;
    try {
        const data = await req.json();
        connectMongo();
        const updatedJob = await jobs.findOneAndUpdate({heading:decodeURIComponent(slug)},data,{new:true})

        if(!updatedJob){
            return NextResponse.json({error: 'job not found'},{status:404});
        }


        return NextResponse.json({message:"job updated successfully"},updatedJob,{status:200});
    
    } catch (error) {
         return NextResponse.json({ error: 'Failed to fetch job', message: error.message }, { status: 500 });
    }

}

export async function DELETE (req,{params}){
    const {slug}= params;
    try {
        connectMongo();
        const deleteJob = await jobs.findOneAndDelete({heading:decodeURIComponent(slug)})

        if(!deleteJob){
            return NextResponse.json({error:'job not found'},{status:404});
        }

        return NextResponse.json({message:"job deleted successfully"},{status:200});
        } catch (error) {
         return NextResponse.json({ error: 'Failed to fetch job', message: error.message }, { status: 500 });
    }
}