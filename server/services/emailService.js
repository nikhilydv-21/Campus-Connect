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
  try {
    console.log("========== SMTP DEBUG ==========");
    console.log("SMTP_HOST:", process.env.SMTP_HOST);
    console.log("SMTP_PORT:", process.env.SMTP_PORT);
    console.log("SMTP_USER:", process.env.SMTP_USER);
    console.log("EMAIL_USER:", process.env.EMAIL_USER);

    await transporter.verify();
    console.log("✅ SMTP VERIFIED");

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
  } catch (error) {
    console.error("❌ EMAIL ERROR");
    console.error(error);
    throw error;
  }
};

module.exports = sendEmail;