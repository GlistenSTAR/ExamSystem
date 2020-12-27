const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ExamInfoSchema = new Schema({
  examid: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Answer = mongoose.model('examinfos', ExamInfoSchema);
