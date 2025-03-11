const pdfParse = require('pdf-parse');
const fs = require('fs');

const extractTextFromPDF = async (file) => {
  try {
    const dataBuffer = fs.readFileSync(file.path);
    const data = await pdfParse(dataBuffer);
    const text = data.text || "No text extracted";

    console.log("Raw Extracted Text:", text); 

    // Extract key sections
    const extractedData = {
      personalInfo: extractSection(text, /(?:Name|Personal Information):?\s*(.*?)(?=Education|Experience|Projects|$)/i),
      education: extractSection(text, /(?:Education|Academic Background):?\s*(.*?)(?=Experience|Projects|$)/i),
      qualifications: extractSection(text, /(?:Skills|Certifications|Qualifications):?\s*(.*?)(?=Experience|Projects|$)/i),
      projects: extractSection(text, /(?:Projects|Portfolio):?\s*(.*?)(?=Experience|Certifications|$)/i),
    };

    console.log("Extracted CV Data:", extractedData);

    return extractedData;
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    return { personalInfo: "Error", education: "Error", qualifications: "Error", projects: "Error" };
  }
};

const extractSection = (text, regex) => {
  const match = text.match(regex);
  return match ? match[1].trim() : "Not Found";
};

module.exports = extractTextFromPDF;
