const nodemailer = require('nodemailer');

// Configure your SMTP transport here
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.example.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'your@email.com',
    pass: process.env.SMTP_PASS || 'yourpassword',
  },
});

async function sendAccountEmail({ to, subject, accountDetails, type }) {
  const securityNote = `Please keep your account details safe and do not share them with anyone. Protecting your credentials helps secure your account.`;
  const html = `
    <div style="font-family: Arial, sans-serif; background: #f8f9fa; border-radius: 8px; max-width: 500px; margin: auto; padding: 0;">
      <div style="background: #fff; border-radius: 8px; padding: 32px 16px 24px 16px; text-align: center;">
        <img src="https://equityvaultsecurities.vercel.app/lite-logo.jpg" alt="EquityVault Logo" style="width: 80px; height: 80px; border-radius: 50%; margin-bottom: 18px; display: block; margin-left: auto; margin-right: auto;" />
        <h2 style="color: #007bff; margin-bottom: 16px; font-size: 1.5em;">Congratulations!</h2>
        <p style="font-size: 16px; color: #333; margin-bottom: 18px;">
          Your ${type === 'Live Trading' ? 'live trading account' : 'wallet account'} was created successfully.
        </p>
        <h3 style="color: #007bff; margin-bottom: 12px; font-size: 1.2em;">Account Details</h3>
        <pre style="background: #f4f4f4; padding: 12px; border-radius: 6px; text-align: left; font-size: 15px; color: #333; margin-bottom: 18px;">${accountDetails}</pre>
        <p style="font-size: 15px; color: #555; margin-bottom: 24px; text-align: left;">${securityNote}</p>
        <p style="font-size: 15px; color: #555; margin-bottom: 32px; text-align: left;">Best regards,<br/><strong>EquityVault Securities Team</strong></p>
      </div>
      <footer style="background: #fff; border-top: 1px solid #eee; padding: 18px 0 0 0; text-align: center; border-radius: 0 0 8px 8px; font-size: 13px; color: #888; margin-top: 0;">
        EquityVault Securities &copy; ${new Date().getFullYear()}
      </footer>
    </div>
  `;
  await transporter.sendMail({
    from: `Equity Vault <${process.env.SMTP_USER || 'no-reply@trade-lite.com'}>`,
    to,
    subject,
    html,
  });
}

module.exports = { sendAccountEmail };