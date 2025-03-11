const uploadToAzure = require('../services/azureStorage');
const extractTextFromPDF = require('../services/pdfParser');
const sendFollowUpEmail = require('../services/emailService');
const saveToGoogleSheet = require('../services/googleSheetsService');
const Applicant = require('../models/Applicant');
const axios = require('axios');

const processApplication = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const file = req.file;
    const cvUrl = await uploadToAzure(file);
    const extractedText = await extractTextFromPDF(file);

    // Define applicantData properly before using it
    const applicantData = {
      name,
      email,
      phone,
      cvUrl,
      extractedData: extractedText || "No text extracted",
      submissionStatus: "testing",
      timestamp: new Date(),
    };

    // Save to MongoDB
    const applicant = new Applicant(applicantData);
    await applicant.save();

    // Save extracted data to Google Sheets
    await saveToGoogleSheet(applicantData);

    // Check if the candidate email exists in the .env file
    if (!process.env.CANDIDATE_EMAIL) {
      console.error("❌ CANDIDATE_EMAIL is not set in .env file!");
      return res.status(500).json({ success: false, message: "Server configuration error" });
    }

    // Webhook Payload
    const webhookPayload = {
      cv_data: {
        personal_info: { name, email, phone },
        extractedData: extractedText || "No text extracted",
        cv_public_link: cvUrl,
      },
      metadata: {
        applicant_name: name,
        email: email,
        status: "testing", // Change to "prod" for final submission
        cv_processed: true,
        processed_timestamp: new Date().toISOString(),
      },
    };

    // Send Webhook Request
    const webhookResponse = await axios.post('https://rnd-assignment.automations-3d6.workers.dev/', webhookPayload, {
      headers: { 
        'X-Candidate-Email': process.env.CANDIDATE_EMAIL, // Required header
        'Content-Type': 'application/json',
      },
    });

    // Log webhook response
    console.log("✅ Webhook Response:", webhookResponse.data);

    res.json({ success: true, message: "Application submitted and webhook request sent successfully!" });

    // Schedule follow-up email
    setTimeout(() => sendFollowUpEmail(email, name), 24 * 60 * 60 * 1000);
    
  } catch (error) {
    console.error("❌ Webhook or application processing error:", error.response?.data || error.message);
    res.status(500).json({ success: false, message: 'Error processing application' });
  }
};

module.exports = { processApplication };
