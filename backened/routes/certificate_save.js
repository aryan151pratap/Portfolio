const Certificate = require('../models/certificate.js');
const User = require('../models/user.js');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authentication.js');

router.post('/save', auth, async (req, res) => {
	try {
		const {
			title,
			provider,
			industry,
			skill,
			date,
			duration,
			credentials,
			description,
			imageUrl,
			tools,
			paid,
		} = req.body;

		const userId = req.user.userId;

		let certificate = await Certificate.findOne({ userId, title });

		if (certificate) {
			certificate.provider = provider;
			certificate.industry = industry;
			certificate.skill = skill;
			certificate.date = date;
			certificate.duration = duration;
			certificate.credentials = credentials;
			certificate.description = description;
			certificate.imageUrl = imageUrl;
			certificate.tools = tools;
			certificate.paid = paid;

			const updatedCertificate = await certificate.save();
			return res.status(200).json({ success: true, certificate: updatedCertificate, updated: true });
		}

		const newCertificate = new Certificate({
			userId,
			title,
			provider,
			industry,
			skill,
			date,
			duration,
			credentials,
			description,
			imageUrl,
			tools,
			paid,
		});

		const savedCertificate = await newCertificate.save();
		res.status(200).json({ success: true, certificate: savedCertificate, created: true });
	} catch (error) {
		res.status(500).json({ success: false, error: 'Failed to save certificate' });
	}
});


router.get('/get/:offset', auth, async (req, res) => {
	try {
		const offset = parseInt(req.params.offset) || 0; // offset means how many items to skip
		const limit = 10;

		const certificates = await Certificate.find({ userId: req.user.userId })
		// .sort({ date: -1 })
		.skip(offset)
		.limit(limit);

		res.status(200).json({ certificates });
	} catch (err) {
		console.error('Error fetching certificates:', err);
		res.status(500).json({ error: 'Failed to fetch certificate data' });
	}
});


router.delete('/delete/:id', auth, async (req, res) => {
	try {
		const cert = await Certificate.findOneAndDelete({
			_id: req.params.id,
			userId: req.user.userId,
		});

		if (!cert) {
			return res.status(404).json({ error: 'Certificate not found or unauthorized' });
		}

		res.status(200).json({ message: 'Certificate deleted successfully' });
	} catch (err) {
		console.error('Error deleting certificate:', err);
		res.status(500).json({ error: 'Failed to delete certificate' });
	}
})

module.exports = router;
