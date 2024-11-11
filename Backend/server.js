const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Asana = require('./models/Asana'); // Import the Asana model
const updateBestTime = require('./routes/updateBestTime');  // Import the update route

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration (only allow requests from React app running on port 3000)
app.use(cors({
  origin: 'http://localhost:3000', // Your React app URL
}));

// Middleware to parse incoming JSON data
app.use(express.json()); // Parses application/json requests

// MongoDB connection URI for the 'yogavad' database
const mongoURI = 'mongodb://127.0.0.1:27017/yogavad'; // Connect to the 'yogavad' database

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully!');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

// Define a route to fetch all asanas (from the 'asanas' collection)
app.get('/asanas', async (req, res) => {
  try {
    // Fetch all documents from the 'asanas' collection
    const asanas = await Asana.find();  // You can add filtering here if needed

    // Print the fetched asanas in the console (for debugging)
    console.log(asanas);

    // Send the fetched asanas as JSON response
    res.json(asanas);
  } catch (err) {
    console.error('Error fetching asanas from MongoDB', err);
    res.status(500).json({ message: 'Error fetching asanas', error: err });
  }
});

// Use the updateBestTime route to handle updating the best time
app.use('/api', updateBestTime);  // Use the update route for all API calls under `/api`

// Define the POST route for updating the best time (merge with the updateBestTime functionality)
app.post('/api/update-best-time', async (req, res) => {
  const { name, bestTime } = req.body;

  try {
    // Find the Asana document by name and update the best time
    const updatedAsana = await Asana.findOneAndUpdate(
      { name },
      { bestTime },
      { new: true, upsert: true }  // Upsert creates the document if it doesn't exist
    );

    console.log(`Updated best time for ${name}: ${bestTime}`);
    
    // Send response to client with updated data
    res.status(200).send({
      message: 'Best time updated successfully!',
      updatedData: updatedAsana,
    });
  } catch (error) {
    console.error('Error updating best time:', error);
    res.status(500).send({ message: 'Error updating best time.' });
  }
});

// In server.js or your routes file
app.get('/api/best-time/:poseName', async (req, res) => {
  const { poseName } = req.params;

  try {
    // Find the asana document by pose name
    const asana = await Asana.findOne({ name: poseName });

    // If the asana is not found, return a 404 error
    if (!asana) {
      return res.status(404).json({ message: `Pose ${poseName} not found.` });
    }

    // Return the bestTime for that asana
    res.json({ bestTime: asana.bestTime });
  } catch (error) {
    console.error('Error fetching best time:', error);
    res.status(500).json({ message: 'Error fetching best time from the database.' });
  }
});




// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
