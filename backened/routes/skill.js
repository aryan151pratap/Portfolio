const Wallet  = require('../models/wallet');
const User = require('../models/user');
const auth = require('../middleware/authentication');
const express = require('express');
const router = express.Router();

router.post('/save', auth, async (req, res) => {
	const { skill, level, content } = req.body;
	if (!skill || level <= 0) {
		return res.status(400).json({ error: 'All fields are required' });
	}
	try{
		const updatedProject = await Wallet.findOneAndUpdate(
			{ userId: req.user.userId, skill },
			{
				userId: req.user.userId,
				skill,
				level,
				content
			},
			{
			new: true,
			upsert: true,
			setDefaultsOnInsert: true
			}
		);
		res.status(200).json({ message: 'Skill saved', updatedProject });
	} catch(err){
		console.log({'error': err});
	}
});


router.get('/get', auth, async (req, res) => {
	try {
		const skills = await Wallet.find({ 
			userId: req.user.userId
			// content: { $exists: false }
		});
		res.status(200).json({ skills, name: req.user.name });
	} catch (err) {
		console.error('Error fetching skills:', err);
		res.status(500).json({ error: 'Failed to fetch skill data' });
	}
});

router.delete('/delete/:id', auth, async (req, res) => {
  try {
		const cert = await Wallet.findOneAndDelete({
			_id: req.params.id,
			userId: req.user.userId,
		});
	
		if (!cert) {
			return res.status(404).json({ error: 'skill not found or unauthorized' });
		}
	
	res.status(200).json({ message: 'skill deleted successfully' });
	} catch (err) {
		console.error('Error deleting skill:', err);
		res.status(500).json({ error: 'Failed to delete skill' });
	}
})

module.exports = router;