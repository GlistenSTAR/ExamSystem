const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const AdminUserSchema = new Schema({
  userid: {
    type: String,
    required: true,
    default: "admin"
  },
  password: {
    type: String,
    required: true,
    default: "123456"
  }
});

module.exports = User = mongoose.model('admins', AdminUserSchema);
