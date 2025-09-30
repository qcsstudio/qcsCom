import mongoose from "mongoose";
const CandidateSchema = new mongoose.Schema(
    {
        fullName: {
            type: String
        },
        email: {
            type: String,
            unique: true,
        },
        contact_Number: {
            type: String,
        },
        address: {
            type: String,
        },
        collegeName: {
            type: String,
        },
       course:{
        type:String
       },
       carrer_option:{
        type:String,
        default:""
       }
    },
    {
        timestamps: true,
    }
);
// Export the model (reuse if already defined)
export default mongoose.models.Candidate || mongoose.model("Candidate", CandidateSchema);