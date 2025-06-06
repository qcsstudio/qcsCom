import { NextResponse } from 'next/server';
import connectMongo from "@/lib/mongodb";
import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';
import FeeReceipt from '@/models/feeReceipt';
import { Readable } from 'stream';

export async function POST(req) {
    try {
        const formData = await req.formData();
        const pdfBlob = formData.get('pdf');
        const metaRaw = formData.get('meta');

        if (!pdfBlob || !metaRaw) {
            return NextResponse.json({ error: 'Missing data' }, { status: 400 });
        }

        const meta = JSON.parse(metaRaw);
        const buffer = Buffer.from(await pdfBlob.arrayBuffer());

        await connectMongo();
        const db = mongoose.connection.db;
        const bucket = new GridFSBucket(db, { bucketName: 'receipts' });

        return new Promise((resolve, reject) => {
            const uploadStream = bucket.openUploadStream(`${meta.receiptNo || 'receipt'}.pdf`, {
                contentType: 'application/pdf',
            });

            const readableStream = Readable.from(buffer);
            readableStream.pipe(uploadStream);

            uploadStream.on('error', (error) => {
                console.error('GridFS upload error:', error);
                reject(NextResponse.json({ error: 'Failed to upload file' }, { status: 500 }));
            });

            uploadStream.on('finish', async () => {
                try {
                    const newReceipt = new FeeReceipt({
                        ...meta,
                        file: uploadStream.id, // ✅ use .id instead of ._id
                    });

                    await newReceipt.save();
                    resolve(NextResponse.json({ message: 'Saved successfully' }));
                } catch (saveError) {
                    console.error('Error saving to DB:', saveError);
                    reject(NextResponse.json({ error: 'Failed to save receipt' }, { status: 500 }));
                }
            });
        });

    } catch (err) {
        console.error('API Error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET() {
    await connectMongo();
    const receipts = await FeeReceipt.find().sort({ createdAt: -1 });
    return NextResponse.json(receipts);
}
