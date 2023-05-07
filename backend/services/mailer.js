require('dotenv').config();
const nodemailer = require('nodemailer');

async function sendVerificationEmail(email, verificationToken) {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or another email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const verificationLink = `http://yourwebsite.com/verify-email?token=${verificationToken}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Email Verification',
    text: `Click the link to verify your email: ${verificationLink}`,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = {
    sendVerificationEmail
}
  
