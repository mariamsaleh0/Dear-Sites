const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// POST /comment endpoint
app.post('/comment', async (req, res) => {
  const { name, email, comment } = req.body;

  console.log('📩 Received:', name, email, comment);

  if (!name || !email || !comment) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mariam321303@gmail.com', // your email
      pass: 'rvvdzvfbyfyiuklb'         // your 16-character Gmail App Password
    }
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: 'mariam321303@gmail.com',
    subject: 'New Comment',
    text: `Name: ${name}\nEmail: ${email}\nComment:\n${comment}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent!');
    res.status(200).json({ message: 'Comment sent successfully!' });
  } catch (error) {
    console.error('❌ Error sending email:', error);
    res.status(500).json({ message: 'Failed to send comment.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

