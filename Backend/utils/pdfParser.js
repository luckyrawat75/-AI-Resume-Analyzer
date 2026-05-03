const fs = require("fs");
const pdfParse = require("pdf-parse/lib/pdf-parse.js");

const parsePDF = async (filePath) => {
  try {
    // 📄 Read file
    const dataBuffer = fs.readFileSync(filePath);

    // 📄 Parse PDF
    const pdfData = await pdfParse(dataBuffer);

    // 🧹 Delete file after parsing
    fs.unlink(filePath, () => {});

    const text = pdfData.text;

    if (!text || text.trim().length === 0) {
      throw new Error("No readable text found in PDF");
    }

    return text;

  } catch (error) {
    console.error("PDF PARSER ERROR:", error.message);

    // 🧹 Cleanup if error
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, () => {});
    }

    throw error;
  }
};

module.exports = { parsePDF };