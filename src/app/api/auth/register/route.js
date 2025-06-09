// /app/api/auth/register/route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectMongo from '@/lib/mongodb';
import { Admin } from '@/models/admin';

export async function POST(req) {
  await connectMongo();
  const { email, password } = await req.json();

  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) return NextResponse.json({ error: 'Email already exists' }, { status: 400 });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newAdmin = new Admin({ email, password: hashedPassword });
  await newAdmin.save();

  return NextResponse.json({ success: true, message: 'Admin registered' });
}
