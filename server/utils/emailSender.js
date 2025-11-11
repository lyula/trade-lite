const axios = require('axios');

const SMTP_EXPRESS_API_URL = 'https://api.smtpexpress.com/send';
const SMTP_EXPRESS_SECRET = process.env.SMTP_EXPRESS_SECRET || '4f15673824ddb723f15bcb29e8609cb4d86435df6c192007bf';
const SMTP_EXPRESS_SENDER = 'equityvault-770bbf@ensend.me';

async function sendAccountEmail({ to, subject, accountDetails, type }) {
  let html;
  
  if (type === 'OTP') {
    // OTP email template - matches Welcome email structure
    html = `
      <div style="font-family: Arial, sans-serif; background: #f8f9fa; border-radius: 8px; max-width: 500px; margin: auto; padding: 0;">
        <div style="background: #fff; border-radius: 8px 8px 0 0; padding: 24px 16px 0 16px; text-align: center;">
          <img src="https://equityvaultsecurities.vercel.app/lite-logo.jpg" alt="EquityVault Logo" width="80" height="80" style="border-radius: 50%;" />
        </div>
        <div style="background: #fff; border-radius: 0 0 8px 8px; padding: 32px 16px 24px 16px; text-align: center;">
          <h2 style="color: #1a2a4a; margin-bottom: 16px; font-size: 1.5em; font-weight: bold;">VERIFY YOUR EMAIL ADDRESS</h2>
          <p style="font-size: 15px; color: #555; margin-bottom: 24px;">
            Please use the following One-Time Password (OTP) to complete your registration. This code will expire in 10 minutes.
          </p>
          <div style="background: #f4f4f4; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
            <p style="font-size: 32px; color: #1a4aff; font-weight: bold; margin: 0; letter-spacing: 8px;">${accountDetails}</p>
          </div>
          <p style="font-size: 14px; color: #888; margin-bottom: 32px;">
            If you didn't request this code, please ignore this email.
          </p>
        </div>
        <footer style="background: #fff; border-top: 1px solid #eee; padding: 18px 0 0 0; text-align: center; border-radius: 0 0 8px 8px; font-size: 13px; color: #888; margin-top: 0;">
          EquityVault Securities &copy; ${new Date().getFullYear()}
        </footer>
      </div>
    `;
  } else if (type === 'Welcome') {
    // New Welcome email template (logo left, user icon right, headline, intro, sign-in button, no email/password)
    html = `
      <div style="font-family: Arial, sans-serif; background: #f8f9fa; border-radius: 8px; max-width: 500px; margin: auto; padding: 0;">
        <div style="background: #fff; border-radius: 8px 8px 0 0; padding: 24px 16px 0 16px; text-align: center;">
          <img src="https://equityvaultsecurities.vercel.app/lite-logo.jpg" alt="EquityVault Logo" width="80" height="80" style="border-radius: 50%;" />
        </div>
        <div style="background: #fff; border-radius: 0 0 8px 8px; padding: 32px 16px 24px 16px; text-align: center;">
          <h2 style="color: #1a2a4a; margin-bottom: 16px; font-size: 1.5em; font-weight: bold;">WELCOME TO THE MOST INNOVATIVE TRADING PLATFORM.</h2>
          <p style="font-size: 15px; color: #555; margin-bottom: 32px;">
            Thank you for choosing us as your main platform for trading in financial markets! We have received your registration request and created a personal trading account for you.
          </p>
          <a href="https://equityvaultsecurities.vercel.app/login" style="display: inline-block; background: #1a4aff; color: #fff; font-weight: bold; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-size: 16px; margin-top: 16px;">
            SIGN IN TO YOUR ACCOUNT
          </a>
        </div>
        <footer style="background: #fff; border-top: 1px solid #eee; padding: 18px 0 0 0; text-align: center; border-radius: 0 0 8px 8px; font-size: 13px; color: #888; margin-top: 0;">
          EquityVault Securities &copy; ${new Date().getFullYear()}
        </footer>
      </div>
    `;
  } else if (type === 'ContactAutoReply') {
    // Auto-reply to user who submitted contact form - matches template structure
    const firstName = accountDetails;
    html = `
      <div style="font-family: Arial, sans-serif; background: #f8f9fa; border-radius: 8px; max-width: 500px; margin: auto; padding: 0;">
        <div style="background: #fff; border-radius: 8px 8px 0 0; padding: 24px 16px 0 16px; text-align: center;">
          <img src="https://equityvaultsecurities.vercel.app/lite-logo.jpg" alt="EquityVault Logo" width="80" height="80" style="border-radius: 50%;" />
        </div>
        <div style="background: #fff; border-radius: 0 0 8px 8px; padding: 32px 16px 24px 16px; text-align: center;">
          <h2 style="color: #1a2a4a; margin-bottom: 16px; font-size: 1.5em; font-weight: bold;">THANK YOU FOR CONTACTING US</h2>
          <p style="font-size: 15px; color: #555; margin-bottom: 32px;">
            Hi ${firstName},<br/><br/>
            We have received your message and our team will respond to you promptly. Thank you for choosing EquityVault Securities.
          </p>
        </div>
        <footer style="background: #fff; border-top: 1px solid #eee; padding: 18px 0 0 0; text-align: center; border-radius: 0 0 8px 8px; font-size: 13px; color: #888; margin-top: 0;">
          EquityVault Securities &copy; ${new Date().getFullYear()}
        </footer>
      </div>
    `;
  } else {
    // Account creation email template - matches template structure
    const securityNote = `Please keep your account details safe and do not share them with anyone. Protecting your credentials helps secure your account.`;
    html = `
      <div style="font-family: Arial, sans-serif; background: #f8f9fa; border-radius: 8px; max-width: 500px; margin: auto; padding: 0;">
        <div style="background: #fff; border-radius: 8px 8px 0 0; padding: 24px 16px 0 16px; text-align: center;">
          <img src="https://equityvaultsecurities.vercel.app/lite-logo.jpg" alt="EquityVault Logo" width="80" height="80" style="border-radius: 50%;" />
        </div>
        <div style="background: #fff; border-radius: 0 0 8px 8px; padding: 32px 16px 24px 16px; text-align: center;">
          <h2 style="color: #1a2a4a; margin-bottom: 16px; font-size: 1.5em; font-weight: bold;">ACCOUNT CREATED SUCCESSFULLY</h2>
          <p style="font-size: 15px; color: #555; margin-bottom: 24px;">
            Congratulations! Your ${type === 'Live Trading' ? 'live trading account' : 'wallet account'} has been created successfully.
          </p>
          <div style="background: #f4f4f4; border-radius: 8px; padding: 16px; margin-bottom: 24px; text-align: left;">
            <h3 style="color: #1a4aff; margin-bottom: 12px; font-size: 1.1em; text-align: center;">Account Details</h3>
            <pre style="background: transparent; padding: 0; text-align: left; font-size: 14px; color: #333; margin: 0; white-space: pre-wrap; font-family: 'Courier New', monospace;">${accountDetails}</pre>
          </div>
          <p style="font-size: 13px; color: #888; margin-bottom: 32px;">
            ${securityNote}
          </p>
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

// Function to send contact form notification to admin
async function sendContactNotification({ name, email, message }) {
  const html = `
    <div style="font-family: Arial, sans-serif; background: #f8f9fa; border-radius: 8px; max-width: 600px; margin: auto; padding: 0;">
      <div style="background: #fff; border-radius: 8px; padding: 32px 24px; text-align: left;">
        <h2 style="color: #007bff; margin-bottom: 24px; font-size: 1.5em;">New Contact Form Submission</h2>
        
        <div style="margin-bottom: 20px;">
          <p style="font-size: 14px; color: #666; margin-bottom: 4px;">From:</p>
          <p style="font-size: 16px; color: #333; margin: 0; font-weight: bold;">${name}</p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <p style="font-size: 14px; color: #666; margin-bottom: 4px;">Email:</p>
          <p style="font-size: 16px; color: #333; margin: 0;">
            <a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a>
          </p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <p style="font-size: 14px; color: #666; margin-bottom: 8px;">Message:</p>
          <div style="background: #f4f4f4; padding: 16px; border-radius: 6px; border-left: 4px solid #007bff;">
            <p style="font-size: 15px; color: #333; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
        
        <p style="font-size: 13px; color: #888; margin-top: 24px; padding-top: 16px; border-top: 1px solid #eee;">
          Submitted on: ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'long' })}
        </p>
      </div>
      <footer style="background: #fff; border-top: 1px solid #eee; padding: 18px 0 0 0; text-align: center; border-radius: 0 0 8px 8px; font-size: 13px; color: #888; margin-top: 0;">
        EquityVault Securities &copy; ${new Date().getFullYear()}
      </footer>
    </div>
  `;

  // Admin email - you can set this in environment variable or hardcode
  const adminEmail = process.env.CONTACT_RECEIVER || 'admin@equityvault.com';

  const payload = {
    subject: `Contact Form: New message from ${name}`,
    message: html,
    sender: {
      name: 'EquityVault Contact Form',
      email: SMTP_EXPRESS_SENDER,
    },
    recipients: { 
      email: adminEmail,
      name: 'Admin'
    },
    // Set reply-to as the user's email so admin can reply directly
    replyTo: {
      email: email,
      name: name
    }
  };

  try {
    const response = await axios.post(SMTP_EXPRESS_API_URL, payload, {
      headers: {
        'Authorization': `Bearer ${SMTP_EXPRESS_SECRET}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('Contact notification sent to admin:', response.data);
  } catch (error) {
    console.error('Failed to send contact notification:', error.response?.data || error.message);
    throw new Error('Contact notification failed');
  }
}

// Helper function to send OTP email for password reset
async function sendOtpEmail(to, otpCode) {
  const subject = 'Your Password Reset OTP';
  const html = `
    <div style="font-family: Arial, sans-serif; background: #f8f9fa; border-radius: 8px; max-width: 500px; margin: auto; padding: 0;">
      <div style="background: #fff; border-radius: 8px 8px 0 0; padding: 24px 16px 0 16px; text-align: center;">
        <img src="https://equityvaultsecurities.vercel.app/lite-logo.jpg" alt="EquityVault Logo" width="80" height="80" style="border-radius: 50%;" />
      </div>
      <div style="background: #fff; border-radius: 0 0 8px 8px; padding: 32px 16px 24px 16px; text-align: center;">
        <h2 style="color: #1a2a4a; margin-bottom: 16px; font-size: 1.5em; font-weight: bold;">RESET YOUR PASSWORD</h2>
        <p style="font-size: 15px; color: #555; margin-bottom: 24px;">
          Please use the following One-Time Password (OTP) to reset your account password. This code will expire in 10 minutes.
        </p>
        <div style="background: #f4f4f4; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
          <p style="font-size: 32px; color: #1a4aff; font-weight: bold; margin: 0; letter-spacing: 8px;">${otpCode}</p>
        </div>
        <p style="font-size: 14px; color: #888; margin-bottom: 32px;">
          If you didn't request a password reset, please ignore this email or contact support if you have concerns.
        </p>
      </div>
      <footer style="background: #fff; border-top: 1px solid #eee; padding: 18px 0 0 0; text-align: center; border-radius: 0 0 8px 8px; font-size: 13px; color: #888; margin-top: 0;">
        EquityVault Securities &copy; ${new Date().getFullYear()}
      </footer>
    </div>
  `;

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
    console.log('Password reset OTP email sent successfully:', response.data);
  } catch (error) {
    console.error('Failed to send password reset OTP email:', error.response?.data || error.message);
    throw new Error('Email sending failed');
  }
}

module.exports = { sendAccountEmail, sendContactNotification, sendOtpEmail };