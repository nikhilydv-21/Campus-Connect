require("dotenv").config();

const axios = require("axios");

const sendEmail = async (to, subject, html) => {
  try {
    console.log("========== BREVO API DEBUG ==========");

    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Campus Connect",
          email: process.env.EMAIL_USER,
        },
        to: [
          {
            email: to,
          },
        ],
        subject: subject,
        htmlContent: html,
      },
      {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "api-key": process.env.BREVO_API_KEY,
        },
      }
    );

    console.log("✅ Email Sent Successfully");
    console.log(response.data);
  } catch (error) {
    console.error("❌ BREVO API ERROR");

    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }

    throw error;
  }
};

module.exports = sendEmail;