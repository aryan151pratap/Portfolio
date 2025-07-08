const User = require('../models/user.js');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authentication.js');

router.get('/user', auth, async (req, res) => {
	const user = await User.findOne({ email: req.user.email }).select('-password');

	if (!user) return res.status(404).json({ message: 'User not found'});

	const { username, email, image, bio, details } = user;

	res.status(200).json({
		user: {
			username,
			email,
			image,
			bio,
			details
		}
	});
})

router.post('/save', auth, async (req, res) => {
	try {
		const { bio, details } = req.body;

		const updated = await User.findOneAndUpdate(
			{ email: req.user.email },
			{ bio, details },
			{ new: true }
		).select('-password');

		if (!updated) {
			return res.status(404).json({ message: 'User not found' });
		}

		res.status(200).json({
			message: 'Profile saved successfully',
			user: {
				username: updated.username,
				email: updated.email,
				image: updated.image,
				bio: updated.bio,
				details: updated.details
			}
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	}
});

router.post('/image', auth, async (req, res) => {
	try{
		const {image} = req.body;

		const updated = await User.findOneAndUpdate(
			{ email: req.user.email },
			{ image },
			{ new: true }
		).select('-password');

		if (!updated) {
			return res.status(404).json({ message: 'User not found' });
		}
	} catch {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	}
})

module.exports = router; 