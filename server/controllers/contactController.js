const { sendAccountEmail, sendContactNotification } = require('../utils/emailSender');
const ContactMessage = require('../models/ContactMessage');

exports.submitContactForm = async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Save to database
    await ContactMessage.create({ name, email, message });

    // Send notification to admin
    try {
      await sendContactNotification({ name, email, message });
      console.log('Contact notification sent to admin successfully');
    } catch (emailError) {
      console.error('Failed to send admin notification:', emailError.message);
      // Continue even if admin notification fails
    }

    // Send auto-reply to user
    try {
      const firstName = name.split(' ')[0];
      await sendAccountEmail({
        to: email,
        subject: 'Thank you for contacting EquityVault Securities',
        accountDetails: firstName,
        type: 'ContactAutoReply',
      });
      console.log('Contact auto-reply sent to user:', email);
    } catch (emailError) {
      console.error('Failed to send auto-reply:', emailError.message);
      // Continue even if auto-reply fails
    }

    res.json({ 
      success: true,
      message: 'Thank you for contacting us! We have received your message and will get back to you soon.\n\nPlease check your inbox or spam/junk folder for our confirmation email.'
    });
  } catch (err) {
    console.error('Contact form error:', err);
    res.status(500).json({ error: 'Failed to send message.' });
  }
};
