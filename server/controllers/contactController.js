const nodemailer = require('nodemailer');
const ContactMessage = require('../models/ContactMessage');

exports.submitContactForm = async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Save to database
    await ContactMessage.create({ name, email, message });

    // Send email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.example.com',
      port: process.env.SMTP_PORT || 587,
      auth: {
        user: process.env.SMTP_USER || 'user@example.com',
        pass: process.env.SMTP_PASS || 'password',
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER, // always your Gmail
      to: process.env.CONTACT_RECEIVER,
      subject: `Contact Form Submission from ${name}`,
      text: message,
      replyTo: email, // this is the user's email
    });

    // Send auto-reply to user
    // Extract first name (split by space, take first part)
    const firstName = name.split(' ')[0];
    await transporter.sendMail({
      from: `Equity Vault <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Thank you for contacting Equity Vault Securities",
      html: `
        <div style="font-family: Arial, sans-serif; background: #f8f9fa; border-radius: 8px; max-width: 500px; margin: auto; padding: 0;">
          <div style="background: #fff; border-radius: 8px; padding: 32px 16px 24px 16px; text-align: center;">
            <img src="https://equityvaultsecurities.vercel.app/lite-logo.jpg" alt="EquityVault Logo" style="width: 80px; height: 80px; border-radius: 50%; margin-bottom: 18px; display: block; margin-left: auto; margin-right: auto;" />
            <h2 style="color: #007bff; margin-bottom: 16px; font-size: 1.5em;">Hi ${firstName},</h2>
            <p style="font-size: 16px; color: #333; margin-bottom: 24px; text-align: left;">
              Thank you for contacting <strong>EquityVault Securities</strong>.<br/>
              We have received your message and will respond to you promptly.
            </p>
            <p style="font-size: 15px; color: #555; margin-bottom: 32px; text-align: left;">
              Best regards,<br/>
              <strong>EquityVault Securities Team</strong>
            </p>
          </div>
          <footer style="background: #fff; border-top: 1px solid #eee; padding: 18px 0 0 0; text-align: center; border-radius: 0 0 8px 8px; font-size: 13px; color: #888; margin-top: 0;">
            EquityVault Securities &copy; ${new Date().getFullYear()}
          </footer>
        </div>
      `,
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err); // Add this line
    res.status(500).json({ error: 'Failed to send message.' });
  }
};
