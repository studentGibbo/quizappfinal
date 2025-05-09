// models/User.js
const mongoose = require('mongoose');
// Authors: Drew Ambrosino and Owen O'Connell
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  // storing plain-text password (not hashed)
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  // simple overall stats
  stats: {
    correctCount: {
      type: Number,
      default: 0,
      min: 0
    },
    incorrectCount: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  // which questions you've seen *unfinished*
  encounteredQuestions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }]
});

// index leaderboard by correctCount descending 
// Authors: Drew Ambrosino and Owen O'Connell
UserSchema.index({ 'stats.correctCount': -1 });

module.exports = mongoose.model('User', UserSchema);
