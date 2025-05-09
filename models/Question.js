const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: { type: [String], required: true },
  correctIndex: { type: Number, required: true }, 
  difficulty: { type: Number, enum: [1, 2, 3], required: true }
});

module.exports = mongoose.model('Question', questionSchema);