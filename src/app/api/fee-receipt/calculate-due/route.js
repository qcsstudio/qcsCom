// app/api/fee-FeeReceipt/calculate-due/route.js

import { NextResponse } from 'next/server';
import connectMongo from "@/lib/mongodb";
import FeeReceipt from '@/models/feeReceipt';

export async function POST(req) {
    try {
        const { studentId, currentFeeReceived, courseFee } = await req.json();

        if (!studentId || currentFeeReceived === undefined || courseFee === undefined) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        await connectMongo();

        const previousFeeReceipts = await FeeReceipt.find({ studentId });

        const totalPastFee = previousFeeReceipts.reduce((sum, r) => sum + Number(r.feeReceived || 0), 0);
        const totalReceived = totalPastFee + Number(currentFeeReceived);
        const leftFee = Math.max(0, Number(courseFee) - totalReceived);

        return NextResponse.json({
            totalReceived,
            leftFee,
        });
    } catch (error) {
        console.error('Error calculating due fee:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
