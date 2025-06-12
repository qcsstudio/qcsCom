import mongoose from 'mongoose';

const studentIdCounterSchema = new mongoose.Schema({
  year: { type: Number, required: true, unique: true }, 
  count: { type: Number, required: true, default: 0 },
});

// ✅ Use the same model name in both places
export default mongoose.models.StudentIdCounter ||
  mongoose.model('StudentIdCounter', studentIdCounterSchema);
