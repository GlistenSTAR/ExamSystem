const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProblemSchema = new Schema({
  
  name: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  answer: {
    type: Array,
    required: true
  },
  examid: {
    type:String,
    required: true
  },
  create_at: {
    type: Date,
    default: Date.now
  }

 
});

module.exports = Problem = mongoose.model('problems', ProblemSchema);
