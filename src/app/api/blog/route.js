
import { NextResponse } from 'next/server';
import Blog from '@/models/blogs';
import connectMongo from '@/lib/mongodb';

export async function GET() {
  await connectMongo();
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(req) {
  await connectMongo();
  try {
    const data = await req.json();
    const blog = new Blog(data);
    await blog.save();
    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
