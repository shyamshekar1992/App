import axios, { AxiosError } from "axios";

export const sendEmail = async (
  to: string,
  subject: string,
  htmlContent: string,
  attachment?: { filename: string; content: string; encoding: string }
) => {
  try {
    // ✅ Ensure `to` is provided
    if (!to) {
      throw new Error("❌ Missing recipient email address.");
    }

    // ✅ Ensure API Key exists
    if (!process.env.BREVO_API_KEY) {
      throw new Error("❌ Missing Brevo API Key. Set BREVO_API_KEY in your environment variables.");
    }

    console.log(`✅ Sending email to: ${to}`); // Debug log

    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { email: "krithikasrinivasan@alumni.ie.edu" }, // Change to your verified email
        to: [{ email: to }], // ✅ Use dynamic recipient
        subject: subject,
        htmlContent: htmlContent,
        attachments: attachment ? [attachment] : undefined, // ✅ Ensure it's an array
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(`✅ Email sent successfully to: ${to}, Message ID: ${response.data.messageId}`);
    return response.data;
  } catch (error: unknown) {
    // ✅ Cast error to AxiosError to access response data
    const axiosError = error as AxiosError;
    console.error("❌ Error sending email:", axiosError.response?.data || axiosError.message);
    throw new Error("Failed to send email");
  }
};
