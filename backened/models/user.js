const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

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
    type: [mongoose.Schema.Types.Mixed],
    required: false,
    default: []
  },
  current_graph: {
    type: String,
    default: ''
  },
  music:{
    name: String,
    data: String,
    contentType: String,
  },
  viewers: [
    {
      viewerId: {
        type: ObjectId,
        ref: 'User'
      },
      minutesWatched: Number,
      viewedAt: Date
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model("User", UserSchema);
