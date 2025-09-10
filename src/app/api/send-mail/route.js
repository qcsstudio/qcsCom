import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import pdfViewers from "@/models/pdfViewers";
import crypto from "crypto";
import nodemailer from "nodemailer";
const generateVerificationEmail = (verifyUrl) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Email Verification</title>
</head>
<body style="margin:0; padding:0; background-color:#f3f4f6; font-family:Arial, sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#f3f4f6; padding:40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="background:#ffffff; border-radius:8px; padding:40px; text-align:center; box-shadow:0 4px 12px rgba(0,0,0,0.05);">
          <tr>
            <td>
              <!-- Logo / Branding -->
              <h1 style="color:#4f46e5; margin-bottom:20px;">QuantumCrafters Studio</h1>

              <!-- Greeting -->
              <h2 style="color:#111827; margin-bottom:10px;">Verify Your Email</h2>
              <p style="color:#374151; font-size:16px; line-height:24px; margin-bottom:30px;">
                Thanks for signing up! Please confirm your email address by clicking the button below. 
                This link will expire in <strong>1 hour</strong>.
              </p>

              <!-- Button -->
              <a href="${verifyUrl}" 
                 style="display:inline-block; background-color:#4f46e5; color:#ffffff; 
                        text-decoration:none; padding:12px 24px; border-radius:6px; 
                        font-size:16px; font-weight:bold;">
                Verify Email
              </a>

              <!-- Fallback link -->
              <p style="margin-top:30px; font-size:14px; color:#6b7280;">
                If the button above does not work, copy and paste this link into your browser:
              </p>
              <p style="word-break:break-all; font-size:14px; color:#2563eb;">
                ${verifyUrl}
              </p>

              <!-- Footer -->
              <hr style="margin:30px 0; border:none; border-top:1px solid #e5e7eb;" />
              <p style="font-size:12px; color:#9ca3af;">
                If you did not request this email, you can safely ignore it.
              </p>
              <p style="font-size:12px; color:#9ca3af;">© ${new Date().getFullYear()} QuantumCrafters Studio</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export async function POST(req) {
  try {
    await connectMongo();
    const { email, name, path } = await req.json();
    console.log(path, "2222222222222")

    // generate token
    const token = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

    // save token in DB
    let user = await pdfViewers.findOne({ email:email,pdftype:path });

    console.log(user, "useruseruseruser")
    // return
   if (!user) {
  // create new user
  user = new pdfViewers({
    name,
    email,
    verifyToken: token,
    verifyTokenExpiry: expiry,
    pdftype: path,
  });

  await user.save();

  // send verification mail
  let transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NEXT_EMAIL_USER,
      pass: process.env.NEXT_EMAIL_PASS,
    },
  });

  const verifyUrl = `${process.env.NEXT_PUBLIC_Live_URL}/api/verify-email?token=${token}&email=${email}&path=${path}`;

  await transporter.sendMail({
    from: process.env.NEXT_EMAIL_USER,
    to: email,
    subject: "Verify your email",
    html: generateVerificationEmail(verifyUrl),
  });

  return NextResponse.json({ success: true, message: "Verification email sent!",isVerified:false });

} else {
  // update existing user
  user.name = name;
  user.verifyToken = token;
  user.verifyTokenExpiry = expiry;
  user.pdftype = path;

  await user.save();

  const redirectUrl = `${process.env.NEXT_PUBLIC_Live_URL}${path}?token=${token}`;
  console.log(redirectUrl,"redirectUrlredirectUrlredirectUrlredirectUrl")

   return NextResponse.json({ success: true, message: "",url:redirectUrl, isVerified:true}, { status: 200 });
  
}

  } catch (err) {
    console.error("Send email error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
