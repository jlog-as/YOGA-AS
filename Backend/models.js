// models/Asana.js
const mongoose = require('mongoose');

const asanaSchema = new mongoose.Schema({
  poseName: { type: String, required: true },
  bestPerform: { type: Number, required: true },
});

module.exports = mongoose.model('Asana', asanaSchema);
