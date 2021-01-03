const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ExamResultSchema = new Schema({
  user: {
    type: String,
    required:true
  },
  examid:{
    type: String,
    required: true
  },
  result:{
    type:Object,
    required: true
  },
  date:{
    type: Date,
    default: Date.now
  }
});

module.exports = ExamResult = mongoose.model('examResult', ExamResultSchema);
