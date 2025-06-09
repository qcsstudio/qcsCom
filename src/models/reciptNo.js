// models/ReceiptCounter.js
import mongoose from 'mongoose';

const receiptCounterSchema = new mongoose.Schema({
  year: { type: Number, required: true, unique: true },
  count: { type: Number, required: true, default: 0 },
});

export default mongoose.models.reciptNo ||
  mongoose.model('reciptNo', receiptCounterSchema);
