'use client'
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectMongo from "@/lib/mongodb";
import nodemailer from 'nodemailer';

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  // Handle file download
  if (searchParams.has("download")) {
    const fileId = searchParams.get("download");

    if (!mongoose.Types.ObjectId.isValid(fileId)) {
      return NextResponse.json(
        { success: false, error: "Invalid file ID" },
        { status: 400 }
      );
    }

    try {
      await connectMongo();
      const db = mongoose.connection.db;
      const bucket = new mongoose.mongo.GridFSBucket(db, {
        bucketName: "uploads",
      });

      const files = await bucket
        .find({ _id: new mongoose.Types.ObjectId(fileId) })
        .toArray();

      if (!files || files.length === 0) {
        return NextResponse.json(
          { success: false, error: "File not found" },
          { status: 404 }
        );
      }

      const file = files[0];
      const stream = bucket.openDownloadStream(file._id);

      // Convert Node.js stream to Web Stream
      const webStream = new ReadableStream({
        start(controller) {
          stream.on('data', (chunk) => controller.enqueue(chunk));
          stream.on('end', () => controller.close());
          stream.on('error', (err) => controller.error(err));
        },
        cancel() {
          stream.destroy();
        }
      });

      return new Response(webStream, {
        headers: {
          "Content-Type": file.contentType || "application/octet-stream",
          "Content-Disposition": `attachment; filename="${encodeURIComponent(file.filename)}"`,
          "Content-Length": file.length.toString(),
        },
      });
    } catch (error) {
      console.error('Download error:', error);
      return NextResponse.json(
        { success: false, error: "Failed to download file" },
        { status: 500 }
      );
    }
  }

  // Handle application listing
  try {
    await connectMongo();
    const Application = (await import("@/models/jobApplication")).default;
    
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const email = searchParams.get('email');
    
    const query = email ? { email } : {};
    
    const [applications, total] = await Promise.all([
      Application.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Application.countDocuments(query)
    ]);

    const pages = Math.ceil(total / limit);

    const response = applications.map((app) => ({
      _id: app._id.toString(),
      name: app.name,
      email: app.email,
      phone: app.phone,
      location: app.location,
      position: app.position,
      createdAt: app.createdAt,
      fileMeta: {
        filename: app.file?.filename,
        fileId: app.file?._id?.toString(),
        downloadUrl: app.file?._id
          ? `/api/email?download=${app.file._id.toString()}`
          : null,
        size: app.file?.length,
        contentType: app.file?.contentType,
      },
    }));

    return NextResponse.json({ 
      success: true, 
      data: response,
      pagination: {
        page,
        limit,
        total,
        pages
      }
    });
  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}




export async function POST(req) {
  try {
    await connectMongo();
    
    const formData = await req.formData();
    const file = formData.get('file');
    
    if (!formData) {
      return NextResponse.json(
        { success: false, error: "No form data received" },
        { status: 400 }
      );
    }

    // Extract form data
    const data = Object.fromEntries(formData.entries());
    delete data.file;

    // Validate required fields
    const requiredFields = ['name', 'email', 'contact', 'location', 'experience'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false,
          error: `Missing required fields: ${missingFields.join(', ')}` 
        },
        { status: 400 }
      );
    }

    let fileId = null;
    
    // Handle file upload if file exists
    if (file && file.size > 0) {
      const db = mongoose.connection.db;
      const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: 'uploads' });
      
      const uploadStream = bucket.openUploadStream(file.name, {
        metadata: { uploadedBy: data.email },
        contentType: file.type
      });

      const buffer = Buffer.from(await file.arrayBuffer());
      fileId = await new Promise((resolve, reject) => {
        uploadStream.end(buffer);
        uploadStream.on('finish', () => resolve(uploadStream.id));
        uploadStream.on('error', reject);
      });
    }

    // Create application
    const Application = (await import("@/models/jobApplication")).default;
    const newApplicant = await Application.create({
      ...data,
      file: fileId ? {
        _id: fileId,
        filename: file.name,
        length: file.size,
        contentType: file.type
      } : null
    });

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


// export async function POST(req) {
//   try {
  //     await connectMongo();
    
//     const formData = await req.formData();
//     const file = formData.get('file');
    
//     if (!formData) {
//       return NextResponse.json(
//         { success: false, error: "No form data received" },
//         { status: 400 }
//       );
//     }

//     // Extract form data
//     const data = Object.fromEntries(formData.entries());
//     delete data.file;

//     // Validate required fields
//     const requiredFields = ['name', 'email', 'contact', 'location', 'experience'];
//     const missingFields = requiredFields.filter(field => !data[field]);
    
//     if (missingFields.length > 0) {
//       return NextResponse.json(
//         { 
//           success: false,
//           error: `Missing required fields: ${missingFields.join(', ')}` 
//         },
//         { status: 400 }
//       );
//     }

//     let fileId = null;
    
//     // Handle file upload if file exists
//     if (file && file.size > 0) {
//       const db = mongoose.connection.db;
//       const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: 'uploads' });
      
//       const uploadStream = bucket.openUploadStream(file.name, {
//         metadata: { uploadedBy: data.email },
//         contentType: file.type
//       });

//       const buffer = Buffer.from(await file.arrayBuffer());
//       fileId = await new Promise((resolve, reject) => {
//         uploadStream.end(buffer);
//         uploadStream.on('finish', () => resolve(uploadStream.id));
//         uploadStream.on('error', reject);
//       });
//     }

//     // Create application
//     const Application = (await import("@/models/jobApplication")).default;
//     const newApplicant = await Application.create({
//       ...data,
//       file: fileId ? {
//         _id: fileId,
//         filename: file.name,
//         length: file.size,
//         contentType: file.type
//       } : null
//     });

//     // Email sending with better debugging
//     try {
//       console.log('Attempting to send email...');
//       console.log('Using email user:', process.env.EMAIL_USER);

//       // Verify SMTP connection first
//       const transporter = nodemailer.createTransport({
//         host: 'smtp.gmail.com',
//         port: 587,
//         secure: false,
//         auth: {
//           user: process.env.EMAIL_USER,
//           pass: process.env.EMAIL_PASSWORD,
//         },
//         tls: {
//           rejectUnauthorized: false
//         }
//       });

//       // Verify connection configuration
//       await transporter.verify((error, success) => {
//         if (error) {
//           console.error('SMTP Connection Verification Failed:', error);
//           throw error;
//         }
//         console.log('Server is ready to send emails');
//       });

//       const mailOptions = {
//         from: `"QCS Studio" <${process.env.EMAIL_USER}>`,
//         to: 'deepsingh13131212@gmail.com',
//         subject: 'New Job Application Submission',
//         html: `
//           <h1>New Job Application Received</h1>
//           <p><strong>Name:</strong> ${data.name}</p>
//           <p><strong>Email:</strong> ${data.email}</p>
//           <p><strong>Contact:</strong> ${data.contact}</p>
//           <p><strong>Location:</strong> ${data.location}</p>
//           <p><strong>Experience:</strong> ${data.experience}</p>
//           ${data.message ? `<p><strong>Message:</strong> ${data.message}</p>` : ''}
//           <p>View all applications at: <a href="https://qcsstudio.com/admin">qcsstudio.com/admin</a></p>
//         `,
//       };

//       if (file && file.size > 0) {
//         mailOptions.attachments = [{
//           filename: file.name,
//           content: Buffer.from(await file.arrayBuffer()),
//           contentType: file.type
//         }];
//       }

//       const info = await transporter.sendMail(mailOptions);
//       console.log('Email sent successfully:', info.messageId);
//       console.log('Preview URL:', nodemailer.getTestMessageUrl(info));

//     } catch (emailError) {
//       console.error('Email sending failed with details:', {
//         message: emailError.message,
//         stack: emailError.stack,
//         response: emailError.response,
//         code: emailError.code
//       });
      
//       // Still proceed with success response but log email failure
//       console.log('Application was saved but email failed to send');
//     }

//     return NextResponse.json(
//       { 
//         success: true,
//         message: "Application submitted successfully",
//         data: newApplicant
//       },
//       { status: 201 }
//     );

//   } catch (error) {
//     console.error('Submission error:', {
//       message: error.message,
//       stack: error.stack,
//       fullError: JSON.stringify(error, Object.getOwnPropertyNames(error))
//     });
//     return NextResponse.json(
//       { 
//         success: false,
//         error: error.message || "Internal server error",
//         details: process.env.NODE_ENV === 'development' ? error.stack : undefined
//       },
//       { status: 500 }
//     );
//   }
// } 
