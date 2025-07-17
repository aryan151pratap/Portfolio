const User = require('../models/user.js');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authentication.js');

router.get('/user', auth, async (req, res) => {
	const user = await User.findOne({ email: req.user.email }).select('-password');

	if (!user) return res.status(404).json({ message: 'User not found'});

	const { _id, username, email, image, bio, details } = user;

	res.status(200).json({
		user: {
			id: _id,
			username,
			email,
			image,
			bio,
			details
		}
	});
})

router.get('/user-by-id/:id', async (req, res) => {

	const user = await User.findOne({ _id: req.params.id }).select('-password').lean();

	if (!user) return res.status(404).json({ message: 'User not found'});

	const { _id, username, email, image, bio, details } = user;

	res.status(200).json({
		user: {
			id: _id,
			username,
			email,
			image,
			bio,
			details
		}
	});
})

router.post('/another-user/:id', auth, async (req, res) => {
  try {
    const viewerId = req.user.userId;
    const targetUserId = req.params.id;
    const { minutesWatched } = req.body;

    if (viewerId === targetUserId) return res.sendStatus(204);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const user = await User.findById(targetUserId);

    const existingView = user.viewers.find(v =>
      v.viewerId.toString() === viewerId &&
      new Date(v.viewedAt).setHours(0, 0, 0, 0) === today.getTime()
    );

    if (existingView) {
      await User.updateOne(
        { _id: targetUserId, "viewers._id": existingView._id },
        {
          $inc: { "viewers.$.minutesWatched": minutesWatched },
          $set: { "viewers.$.viewedAt": new Date() }
        }
      );
    } else {
      await User.findByIdAndUpdate(targetUserId, {
        $push: {
          viewers: {
            viewerId,
            minutesWatched,
            viewedAt: new Date()
          }
        }
      });
    }

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});


router.get('/get-another-user', auth, async (req, res) => {
	try{
		const userId = req.user.userId;
		const user  = await User.findById(userId)
			.populate('viewers.viewerId', 'username email image')
			.select('username email viewers');


		if(!user){
			res.status(400).json({ message: 'data not found' });
		}
		
		res.status(200).json(user);

	} catch(err) {
		console.log(err);
		res.status(500).json({ message: 'Server error' });
	}
});

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