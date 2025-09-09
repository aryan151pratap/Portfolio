const express = require("express");
const router = express.Router();
const User = require("../models/user");
const auth = require('../middleware/authentication.js');

router.post("/audio", auth, async (req, res) => {
	try {
		const userId = req.user.userId;
		const { name, data, contentType } = req.body;
		if (!name || !data || !contentType)
		return res.status(400).json({ message: "Audio data incomplete" });

		const user = await User.findByIdAndUpdate(
		userId,
		{
			music: {
			name,
			data,
			contentType,
			},
		},
		{ new: true }
		);

		if (!user) return res.status(404).json({ message: "User not found" });

		res.json({ message: "Music uploaded successfully", music: user.music });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
});

router.get("/music/:userId", auth, async (req, res) => {
	try{
		const userId = req.params.userId;
		if(!userId) return res.status(400).json({ message: "No id found!" });
		const music = await User.findOne({_id: userId}).select('music');
		if (!music) return res.status(404).json({ message: "User not found" });
		res.json(music);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
})

module.exports = router;
