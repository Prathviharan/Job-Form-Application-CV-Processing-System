const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { 
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS },
});

const sendFollowUpEmail = async (email, name,) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Job Application Status',
    text: `Dear ${name}, your CV is under review. We'll get back to you soon!`,
  });
};

module.exports = sendFollowUpEmail;
