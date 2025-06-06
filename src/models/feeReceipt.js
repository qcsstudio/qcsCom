import mongoose from "mongoose";

const feeReceiptSchema = new mongoose.Schema({
    receiptNo: String,
    date: Date,
    studentName: String,
    courseName: String,
    courseFee: Number,
    feeReceived: Number,
    dueFee: Number,
    file: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'fs.files', // GridFS reference
        required: true
    }
}, { timestamps: true });

export default mongoose.models.FeeReceipt || mongoose.model("FeeReceipt", feeReceiptSchema);
