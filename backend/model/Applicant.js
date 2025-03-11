const mongoose = require('mongoose');

const ApplicantSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  cvUrl: String,
  extractedData: Object,
  submissionStatus: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Applicant', ApplicantSchema);
