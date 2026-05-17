import mongoose from "mongoose";

const scanSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    imageUrl: { type: String, required: true },
    crop: { type: String, default: "Mixed crop" },
    diseaseName: String,
    confidence: Number,
    severity: String,
    treatment: String,
    pesticideRecommendation: String,
    seedRecommendation: String,
    preventionTips: [String],
    source: String,
    location: { type: String, default: "Field block A" },
  },
  { timestamps: true }
);

export default mongoose.model("Scan", scanSchema);
