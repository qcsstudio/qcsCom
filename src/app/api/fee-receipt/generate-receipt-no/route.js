// app/api/fee-receipt/generate-receipt-no/route.js
import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import reciptNo from '@/models/reciptNo';

export async function GET() {
  try {
    await connectMongo();
    const year = new Date().getFullYear();

    let counter = await reciptNo.findOne({ year });
    if (!counter) {
      counter = await reciptNo.create({ year, count: 0 });
    }

    const formattedCount = String(counter.count).padStart(3, '0');
    const receiptNo = `QCS-${year}-${formattedCount}`;

    return NextResponse.json({ receiptNo });
  } catch (error) {
    console.error('Error fetching receipt number:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}



export async function PUT() {
  try {
    await connectMongo();
    const year = new Date().getFullYear();

    const counter = await reciptNo.findOneAndUpdate(
      { year },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );

    const formattedCount = String(counter.count).padStart(3, '0');
    const receiptNo = `qcs-${year}-${formattedCount}`;

    return NextResponse.json({ receiptNo });
  } catch (error) {
    console.error('Error updating receipt number:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}