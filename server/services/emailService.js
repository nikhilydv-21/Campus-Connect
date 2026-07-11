require("dotenv").config();

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = async (to, subject, html) => {
  const info = await transporter.sendMail({
    from: {
      name: "Campus Connect",
      address: process.env.EMAIL_USER,
    },
    to,
    subject,
    html,
  });

  console.log("✅ Email Sent:", info.messageId);
};

module.exports = sendEmail;