const User = require('../models/user.js');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const handle_cookies = function(user, res){

  const JWT_SECRET = process.env.JWT_SECRET;

  const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
  return res.cookie('token', token, {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000
  }).json({ message: 'Login successful' });

}

router.post('/sign_up', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists!' });
    }

	  const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    handle_cookies(user, res);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {

  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

      if (isPasswordCorrect) {
        return handle_cookies(existingUser, res);
      }
      return res.status(400).json({ message: 'Incorrect password!' }); // ✅ use 400 for wrong credentials
    }
    return res.status(400).json({ message: 'Email Address or password is incorrect!' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/logout', (req, res) => {
	try {
		res.clearCookie('token', {
			httpOnly: true,
			sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
			secure: process.env.NODE_ENV === 'production',
		});
		res.status(200).json({ message: 'Logged out successfully' });
	} catch (err) {
		console.error('Logout error:', err);
		res.status(500).json({ message: 'Logout failed' });
	}
});


module.exports = router;