const Project = require('../models/project.js');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authentication.js');

router.post('/save', auth, async (req, res) => {
  const { name, url, content } = req.body;
  console.log(req.body);
  if (!name || !Array.isArray(content)) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const updatedProject = await Project.findOneAndUpdate(
      { userId: req.user.userId, name }, // ✅ Match by user and name
      {
        userId: req.user.userId,
        name,
        url,
        content
      },
      {
        new: true,       // Return the updated document
        upsert: true,    // Insert if not found
        setDefaultsOnInsert: true
      }
    );
    res.status(200).json({ message: 'Project saved', updatedProject });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save project', details: err });
  }
});

router.get('/project', auth, async (req, res) => {
  try {
    const projects = await Project.find(
      { userId: req.user.userId },
      'name url' // Only include 'name' and 'url'
    ).sort({ createdAt: -1 });

    res.status(200).json({ projects });
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ error: 'Failed to fetch project data' });
  }
});

router.post('/current-project', auth, async (req, res) => {
  try {
    const { name } = req.body;
    const project = await Project.findOne({ userId: req.user.userId , name});
    res.status(200).json({ project });
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ error: 'Failed to fetch project data' });
  }
});


router.delete('/delete/:id', auth, async (req, res) => {
  try {
      const cert = await Project.findOneAndDelete({
        _id: req.params.id,
        userId: req.user.userId,
      });
  
      if (!cert) {
        return res.status(404).json({ error: 'Project not found or unauthorized' });
      }
  
      res.status(200).json({ message: 'Project deleted successfully' });
    } catch (err) {
      console.error('Error deleting Project:', err);
      res.status(500).json({ error: 'Failed to delete Project' });
    }
});

module.exports = router;
