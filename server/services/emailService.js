require("dotenv").config();

const brevo = require("@getbrevo/brevo");

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

const sendEmail = async (to, subject, html) => {
  try {
    console.log("========== BREVO API DEBUG ==========");

    const sendSmtpEmail = new brevo.SendSmtpEmail();

    sendSmtpEmail.sender = {
      name: "Campus Connect",
      email: process.env.EMAIL_USER,
    };

    sendSmtpEmail.to = [
      {
        email: to,
      },
    ];

    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = html;

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log("✅ Email Sent Successfully");
    console.log(response.body);
  } catch (error) {
    console.error("❌ BREVO API ERROR");
    console.error(error.response?.body || error);
    throw error;
  }
};

module.exports = sendEmail;