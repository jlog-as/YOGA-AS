const mongoose = require('mongoose');

// Define the schema for your Asana document
const asanaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  bestTime: {
    type: Number,
    required: true
  }
});

// Create the model based on the schema
const Asana = mongoose.model('Asana', asanaSchema, 'asanas'); // Specify 'asanas' collection explicitly

module.exports = Asana;
