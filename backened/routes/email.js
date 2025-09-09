const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// Send email function
async function sendEmail(to, subject, html) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  const mailOptions = {
    from: `"Support" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html
  };

  await transporter.sendMail(mailOptions);
}

router.post('/send-mail', async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await sendEmail(
		user.email,
		'Reset Your Password',
		`<h2>Hello ${user.username}</h2>
		<p>We received a request to reset your password.</p>
		<p>Click the button below to set a new password:</p>
		<a href="${process.env.FRONTEND_URL}/reset-password?email=${encodeURIComponent(user.email)}&setPassword=true"
			style="
				display:inline-block;
				padding:12px 20px;
				background-color:#4CAF50;
				color:white;
				text-decoration:none;
				border-radius:5px;
				font-size:16px;">
			Set New Password
		</a>
		<p>If you didn’t request this, please ignore this email.</p>`
	);


    res.json({ message: 'New password sent to your email' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error sending new password' });
  }
});


router.post('/change-password', async (req, res) => {
  try{
    const { email, formData } = req.body;
    const newPassword = formData.newPassword;
    const confirmPassword = formData.confirmPassword;

    if (!newPassword || !confirmPassword) {
      return res.status(400).json({ message: 'Missing fields' });
    }
    else if(newPassword !== confirmPassword) return res.status(400).json({ message: 'confirm password not matched' });
    
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists!' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const user = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Password updated successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error sending new password' });
  }
})

module.exports = router;
