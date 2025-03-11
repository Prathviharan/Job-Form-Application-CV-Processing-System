const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('../config/google-credentials.json'); // Google service account credentials

const SHEET_ID = process.env.GOOGLE_SHEET_ID;

const saveToGoogleSheet = async (applicantData) => {
  try {
    const doc = new GoogleSpreadsheet(SHEET_ID);
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    // Debugging: Log structured extracted data
    console.log("Saving to Google Sheets:", applicantData);

    await sheet.addRow({
      Name: applicantData.name,
      Email: applicantData.email,
      Phone: applicantData.phone,
      CV_Link: applicantData.cvUrl,
      Personal_Info: applicantData.extractedData.personalInfo,
      Education: applicantData.extractedData.education,
      Qualifications: applicantData.extractedData.qualifications,
      Projects: applicantData.extractedData.projects,
      Timestamp: new Date().toISOString(),
    });

    console.log("Data successfully saved to Google Sheet.");
  } catch (error) {
    console.error("Error saving to Google Sheet:", error);
  }
};

module.exports = saveToGoogleSheet;
