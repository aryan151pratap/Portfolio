const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false
  },
  bio: {
    type: String,
    required: false
  },
  details: {
    type: [String],
    required: false,
    default: []
  },
  current_graph: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("User", UserSchema);
