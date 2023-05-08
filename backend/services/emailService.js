require('dotenv').config();
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

const sendGridApiKey = process.env.SENDGRID_API_KEY;
const transporter = nodemailer.createTransport(sgTransport({ apiKey: sendGridApiKey }));

async function sendVerificationEmail(email, verificationToken) {
  const verificationLink = `http://localhost:3002/users/verify-email?token=${verificationToken}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Email Verification',
    text: `Click the link to verify your email: ${verificationLink}`,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = {
  sendVerificationEmail,
};
