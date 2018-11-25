const mongoose = require('mongoose');

// mongoose user schema, name and email should be unique
const userSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  role: String
});

module.exports = mongoose.model('User', userSchema);
