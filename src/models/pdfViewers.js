import mongoose from "mongoose";

const emailVerify = new mongoose.Schema({
 name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  isVerified: { type: Boolean, default: false },
  verifyToken: { type: String },
});

export default mongoose.models.pdfViewers || mongoose.model("pdfViewers", emailVerify);
