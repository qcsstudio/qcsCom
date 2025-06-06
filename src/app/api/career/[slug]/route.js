import { NextResponse } from "next/server";
import connectMongo from '@/lib/mongodb';
import jobs from "@/models/jobs";


export async function GET(req, { params }) {
  const { slug } = params;
  try {
    connectMongo();
    const job = await jobs.findOne({ heading: decodeURIComponent(slug) });
    if (!job) {
      return NextResponse.json({ error: 'job not found' }, { status: 404 });
    }
    return NextResponse.json(job, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch job', message: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { slug } = params;

  try {
    const data = await req.json();
    await connectMongo();

    // Ensure required fields are present
    const requiredFields = ['heading', 'description', 'location', 'experience', 'skills', 'workHours'];
    const missingFields = requiredFields.filter(field => !data[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    const updatedJob = await jobs.findOneAndUpdate(
      { heading: decodeURIComponent(slug) },
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Job updated successfully",
      data: updatedJob
    });

  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json(
      { error: 'Failed to update job', details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const { slug } = params;
  try {
    connectMongo();
    const deleteJob = await jobs.findOneAndDelete({ heading: decodeURIComponent(slug) })

    if (!deleteJob) {
      return NextResponse.json({ error: 'job not found' }, { status: 404 });
    }

    return NextResponse.json({ message: "job deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch job', message: error.message }, { status: 500 });
  }
}