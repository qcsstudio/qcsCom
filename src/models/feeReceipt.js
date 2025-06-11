import mongoose from "mongoose";

const feeReceiptSchema = new mongoose.Schema({
    receiptNo: String,
    date: Date,
    studentId: {
        type: String,
        required: true,
        index: true 
    },
    studentName: String,
    courseName: String,
    courseFee: Number,
    feeReceived: Number,
    dueFee: Number,
    file: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'fs.files', 
        required: true
    }
}, { timestamps: true ,strict: false });

export default mongoose.models.FeeReceipt || mongoose.model("FeeReceipt", feeReceiptSchema);