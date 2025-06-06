import { GridFSBucket, ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import connectMongo from '@/lib/mongodb';

export async function GET(req, { params }) {
  const { id } = params;
  
  try {
    await connectMongo();
    const db = mongoose.connection.db;
    
    // Use the same bucket name as upload (receipts)
    const bucket = new GridFSBucket(db, { bucketName: 'receipts' });

    // Convert to ObjectId if possible
    let queryId;
    try {
      queryId = new ObjectId(id);
    } catch (e) {
      return new Response(JSON.stringify({ error: 'Invalid file ID' }), {
        status: 400,
      });
    }

    const files = await bucket.find({ _id: queryId }).toArray();

    if (!files || files.length === 0) {
      return new Response(JSON.stringify({ error: 'File not found' }), {
        status: 404,
      });
    }

    const fileDoc = files[0];
    const downloadStream = bucket.openDownloadStream(fileDoc._id);

    // Create a readable stream to pipe the response
    const stream = new ReadableStream({
      start(controller) {
        downloadStream.on('data', (chunk) => controller.enqueue(chunk));
        downloadStream.on('end', () => controller.close());
        downloadStream.on('error', (err) => controller.error(err));
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': fileDoc.contentType || 'application/pdf',
        'Content-Disposition': `attachment; filename="${fileDoc.filename}"`,
        'Content-Length': fileDoc.length.toString()
      },
    });

  } catch (err) {
    console.error('Error downloading file:', err);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}