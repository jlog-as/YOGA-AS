const express = require('express');
const Asana = require('../models/Asana');  // Import the Asana model
const router = express.Router();

// POST route to update the best time for an asana (pose)
router.post('/update-best-time', async (req, res) => {
  const { name, bestTime } = req.body;  // Get the pose name and best time from the request body

  try {
    // Find the Asana (pose) by name and update its bestTime
    const updatedAsana = await Asana.findOneAndUpdate(
      { name },  // Find the Asana by its name
      { $set: { bestTime } },  // Use $set to specifically update the bestTime field
      { new: true, upsert: true }  // `upsert` ensures a new document is created if not found
    );

    if (!updatedAsana) {
      return res.status(404).json({ message: 'Asana not found' });
    }

    res.status(200).json({
      message: 'Best time updated successfully!',
      updatedAsana
    });
  } catch (err) {
    console.error('Error updating best time:', err);
    res.status(500).json({ message: 'Failed to update best time', error: err });
  }
});

module.exports = router;
