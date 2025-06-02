import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    contact: { type: String },
    location: { type: String },
    linkedin: {type:String},
    github: {type: String},
    experience: { type: String },
    salary: {type: String},
    file: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'fs.files',
        required: true
    },
}, { timestamps: true });

export default mongoose.models.JobApplication || mongoose.model("JobApplication", jobApplicationSchema);