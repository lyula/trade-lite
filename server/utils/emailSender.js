
const axios = require('axios');

const SMTP_EXPRESS_API_URL = 'https://api.smtpexpress.com/send';
const SMTP_EXPRESS_SECRET = process.env.SMTP_EXPRESS_SECRET || '4f15673824ddb723f15bcb29e8609cb4d86435df6c192007bf';
const SMTP_EXPRESS_SENDER = 'equityvault-770bbf@ensend.me';

async function sendAccountEmail({ to, subject, accountDetails, type }) {
  let html;
  
  if (type === 'OTP') {
    // OTP email template
    html = `
      <div style="font-family: Arial, sans-serif; background: #f8f9fa; border-radius: 8px; max-width: 500px; margin: auto; padding: 0;">
        <div style="background: #fff; border-radius: 8px; padding: 32px 16px 24px 16px; text-align: center;">
          <img src="https://equityvaultsecurities.vercel.app/lite-logo.jpg" alt="EquityVault Logo" width="80" height="80" style="width: 80px; height: 80px; border-radius: 50%; margin-bottom: 18px; display: block; margin-left: auto; margin-right: auto; border: 0;" />
          <h2 style="color: #007bff; margin-bottom: 16px; font-size: 1.5em;">Your Registration OTP</h2>
          <p style="font-size: 18px; color: #222; font-weight: bold; margin-bottom: 24px; letter-spacing: 2px;">${accountDetails}</p>
          <p style="font-size: 15px; color: #555; margin-bottom: 32px; text-align: left;">
            Please enter this code to verify your email address.<br/>
            This OTP will expire in 10 minutes.
          </p>
          <p style="font-size: 15px; color: #555; margin-bottom: 32px; text-align: left;">Best regards,<br/><strong>EquityVault Securities Team</strong></p>
        </div>
        <footer style="background: #fff; border-top: 1px solid #eee; padding: 18px 0 0 0; text-align: center; border-radius: 0 0 8px 8px; font-size: 13px; color: #888; margin-top: 0;">
          EquityVault Securities &copy; ${new Date().getFullYear()}
        </footer>
      </div>
    `;
  } else if (type === 'Welcome') {
    // Welcome email template
    // accountDetails format: "Welcome, FirstName!\n\nThank you..."
    const firstLine = accountDetails.split('\n')[0]; // "Welcome, FirstName!"
    const firstName = firstLine.replace('Welcome, ', '').replace('!', '').trim();
    html = `
      <div style="font-family: Arial, sans-serif; background: #f8f9fa; border-radius: 8px; max-width: 500px; margin: auto; padding: 0;">
        <div style="background: #fff; border-radius: 8px; padding: 32px 16px 24px 16px; text-align: center;">
          <img src="https://equityvaultsecurities.vercel.app/lite-logo.jpg" alt="EquityVault Logo" width="80" height="80" style="width: 80px; height: 80px; border-radius: 50%; margin-bottom: 18px; display: block; margin-left: auto; margin-right: auto; border: 0;" />
          <h2 style="color: #007bff; margin-bottom: 16px; font-size: 1.5em;">Welcome, ${firstName}!</h2>
          <p style="font-size: 16px; color: #333; margin-bottom: 24px; text-align: left;">
            Thank you for registering with <strong>EquityVault Securities</strong>.<br/>
            Your account has been created successfully.<br/>
            You can now log in and start using our platform.
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
    `;
  } else {
    // Account creation email template
    const securityNote = `Please keep your account details safe and do not share them with anyone. Protecting your credentials helps secure your account.`;
    html = `
      <div style="font-family: Arial, sans-serif; background: #f8f9fa; border-radius: 8px; max-width: 500px; margin: auto; padding: 0;">
        <div style="background: #fff; border-radius: 8px; padding: 32px 16px 24px 16px; text-align: center;">
          <img src="https://equityvaultsecurities.vercel.app/lite-logo.jpg" alt="EquityVault Logo" width="80" height="80" style="width: 80px; height: 80px; border-radius: 50%; margin-bottom: 18px; display: block; margin-left: auto; margin-right: auto; border: 0;" />
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
  }

  // Prepare payload for SMTP Express API
  const payload = {
    subject,
    message: html,
    sender: {
      name: 'Equity Vault',
      email: SMTP_EXPRESS_SENDER,
    },
    recipients: typeof to === 'string' ? { email: to } : to,
  };

  // Send email via SMTP Express API
  try {
    const response = await axios.post(SMTP_EXPRESS_API_URL, payload, {
      headers: {
        'Authorization': `Bearer ${SMTP_EXPRESS_SECRET}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('Email sent successfully:', response.data);
  } catch (error) {
    console.error('Failed to send email:', error.response?.data || error.message);
    throw new Error('Email sending failed');
  }
}

module.exports = { sendAccountEmail };