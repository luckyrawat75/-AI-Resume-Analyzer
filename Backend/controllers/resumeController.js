const { parsePDF } = require("../utils/pdfParser");
const { analyzeResume } = require("../services/aiService");

exports.uploadResume = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "No file uploaded" });

    const filePath = req.file.path;

    //  Use your parser
    const text = await parsePDF(filePath);

    if (!text.trim())
      return res.status(400).json({ message: "Empty PDF" });

    let aiData;

    try {
      aiData = await analyzeResume(text);
    } catch (err) {
      console.log("AI ERROR:", err.message);
    }

    if (!aiData) {
      aiData = {
        skills: [],
        missingSkills: [],
        score: 50,
        suggestions: ["AI unavailable"],
      };
    }

    res.json({
      message: "Resume processed successfully",
      data: aiData,
    });

  } catch (err) {
    console.error("SERVER ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
};