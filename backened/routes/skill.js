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


router.get('/get/:id', auth, async (req, res) => {
	try {
		const skills = await Wallet.find({ 
			userId: req.params.id
		}).select('level skill');
		res.status(200).json({ skills, name: req.user.name });
	} catch (err) {
		console.error('Error fetching skills:', err);
		res.status(500).json({ error: 'Failed to fetch skill data' });
	}
});

router.get('/get-skill/:id/:skillId', auth, async (req, res) => {
	try {
		const skills = await Wallet.findOne({ 
			userId: req.params.id, _id: req.params.skillId
		});
		res.status(200).json({ skills });
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

router.post('/current_graph', auth, async (req, res) =>{
	try{
		const { current_graph } = req.body;
		console.log(current_graph);
		if (!current_graph) {
			return res.status(400).json({ error: "Missing current_graph in request body" });
		}

		const user = await User.findOneAndUpdate(
			{ _id: req.user.userId },
			{ current_graph },
			{ new: true }
		);

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		res.status(200).json({ message: "Graph updated successfully", user });
	} catch (err){
		console.log(err);
		res.status(500).json({ error: "Internal server error" });
	}
})

router.get('/get_graph/:id', auth, async (req, res) =>{
	try{
		const user = await User.findOne(
			{ _id: req.params.id }
		).select('current_graph');
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		res.status(200).json({ current_graph: user.current_graph });
	} catch (err){
		console.log(err);
		res.status(500).json({ error: "Internal server error" });
	}
})

module.exports = router;