const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
	default: '',
    required: false,
  },
  content: {
    type: [mongoose.Schema.Types.Mixed], // ✅ allows array of any object
    required: false,
    default: []
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("Project", ProductSchema);
