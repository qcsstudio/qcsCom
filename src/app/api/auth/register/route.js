import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectMongo from '@/lib/mongodb';
import { Admin } from '@/models/admin';

export async function POST(req) {
  await connectMongo();

  const { email, password, role } = await req.json();

  // Validate required fields
  if (!email || !password || !role) {
    return NextResponse.json({ error: 'Email, password, and role are required.' }, { status: 400 });
  }

  // Validate allowed roles
  const allowedRoles = ['admin', 'hr', 'seo'];
  if (!allowedRoles.includes(role)) {
    return NextResponse.json({ error: 'Invalid role.' }, { status: 400 });
  }

  // Check for existing admin
  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new admin with role
  const newAdmin = new Admin({
    email,
    password: hashedPassword,
    role,
  });

  await newAdmin.save();

  return NextResponse.json({ success: true, message: 'Admin registered successfully.' });
}
