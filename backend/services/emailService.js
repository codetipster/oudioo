require('dotenv').config();
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendVerificationEmail(email, verificationToken) {
  const verificationLink = `http://localhost:3002/users/verify-email?token=${verificationToken}`;

  const msg = {
    to: email,
    from: process.env.EMAIL_USER,
    subject: 'Theoria Analytica Email Verification',
    text: `Click the link to verify your email for Oudioo with Analytica: ${verificationLink}`,
  };

  await sgMail.send(msg);
}

// recover password
async function sendPasswordResetEmail(email, passwordResetToken) {
  const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password?token=${passwordResetToken}`;

  const msg = {
    to: email,
    from: process.env.EMAIL_USER,
    subject: 'Password Reset Request',
    text: `We received a request to reset your password. Click the link below to set a new password: ${resetPasswordUrl}\n\nIf you didn't request a password reset, please ignore this email.`,
  };

  await sgMail.send(msg);
}

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
};
