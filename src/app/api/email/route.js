import { NextResponse } from "next/server";
import mongoose from "mongoose";
import jobApplication from "@/models/jobApplication";
import connectMongo from "@/lib/mongodb";
import { GridFSBucket } from "mongodb";

export async function POST(req) {
    try {
        await connectMongo();
        
        const formData = await req.formData();
        const file = formData.get('file');
        
        if (!formData) {
            return NextResponse.json(
                { error: "No form data received" },
                { status: 400 }
            );
        }

        // Extract form data
        const data = {};
        for (const [key, value] of formData.entries()) {
            if (key !== 'file') data[key] = value;
        }

        // Validate required fields
        const requiredFields = ['name', 'email', 'contact', 'location', 'experience'];
        const missingFields = requiredFields.filter(field => !data[field]);
        
        if (missingFields.length > 0) {
            return NextResponse.json(
                { error: `Missing required fields: ${missingFields.join(', ')}` },
                { status: 400 }
            );
        }

        let fileId = null;
        
        // Handle file upload if file exists
        if (file && file.size > 0) {
            const db = mongoose.connection.db;
            const bucket = new GridFSBucket(db, { bucketName: 'uploads' });
            
            const uploadStream = bucket.openUploadStream(file.name, {
                metadata: { uploadedBy: data.email }
            });

            const buffer = Buffer.from(await file.arrayBuffer());
            await new Promise((resolve, reject) => {
                uploadStream.write(buffer);
                uploadStream.end();
                uploadStream.on('finish', () => resolve(uploadStream.id));
                uploadStream.on('error', reject);
            });
            
            fileId = uploadStream.id;
        }

        // Create application
        const newApplicant = new jobApplication({
            ...data,
            file: fileId
        });

        await newApplicant.save();

        return NextResponse.json(
            { 
                success: true,
                message: "Application submitted successfully",
                data: newApplicant
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('Submission error:', error);
        return NextResponse.json(
            { 
                success: false,
                error: error.message || "Internal server error"
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await connectMongo();
        
        const applications = await jobApplication.find().sort({createdAt:-1});
        
        if(!applications || applications.length === 0) {
            return NextResponse.json(
                { 
                    success: true,
                    message: "No data found",
                    data: []
                },
                { status: 200 }
            );
        }
        
        return NextResponse.json(
            { 
                success: true,
                data: applications
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Fetch error:', error);
        return NextResponse.json(
            { 
                success: false,
                error: error.message || "Internal server error"
            },
            { status: 400 }
        );
    }
}