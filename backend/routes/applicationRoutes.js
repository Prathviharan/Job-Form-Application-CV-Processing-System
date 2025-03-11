const express = require('express');
const multer = require('multer');
const uploadToAzure = require('../services/azureStorage');
const extractTextFromPDF = require('../services/pdfParser');
const sendFollowUpEmail = require('../services/emailService');
const Applicant = require('../model/Applicant');
const axios = require('axios');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/apply', upload.single('cv'), async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const file = req.file;
    const cvUrl = await uploadToAzure(file);
    const extractedText = await extractTextFromPDF(file);

    const applicant = new Applicant({ name, email, phone, cvUrl, extractedData: extractedText, submissionStatus: 'testing' });
    await applicant.save();

    await axios.post('https://rnd-assignment.automations-3d6.workers.dev/', {
      cv_data: { personal_info: { name, email, phone }, 
      extractedData: extractedText, 
      cv_public_link: cvUrl 
    },
      metadata: { 
        applicant_name: name, email, 
        status: 'testing', 
        cv_processed: true, 
        processed_timestamp: new Date().toISOString() },
    },
    {
      education: [],  // Empty array
      qualifications: [],  // Empty array
      projects: []  // Empty array
    }, { 
      headers: { 'X-Candidate-Email': process.env.CANDIDATE_EMAIL } });

    res.json({ success: true, message: 'Application submitted successfully!' });

    setTimeout(() => sendFollowUpEmail(email, name), 24 * 60 * 60 * 1000); // Send email after 24 hrs
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error processing application' });
  }
});

module.exports = router;
