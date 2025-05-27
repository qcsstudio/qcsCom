import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
    {
        heading: {
            type: String,
        },
        location: {
            type: String,
        },
        experience: {
            type: String,
        },
        workHours: {
            type: String,
        },
        skills:
        {
            type: String,
        }
        ,
        description: {
            type: String,
        },
        metaTitle: {
            type: String,
            default: "Title"
        },
        metaDescription: {
            type: String,
            default: "Description"
        }
    }, { timestamps: true }
)

export default mongoose.models.Job || mongoose.model("Job", JobSchema);