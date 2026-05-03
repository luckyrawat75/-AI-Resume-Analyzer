const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    analysis: {
      skills: { type: [String], default: [] },
      missingSkills: { type: [String], default: [] },
      score: { type: Number, default: 0 },
      suggestions: { type: [String], default: [] },
    },
  },
  { timestamps: true }
);

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;