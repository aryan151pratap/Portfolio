const mongoose = require("mongoose");

const WalletSchema = new mongoose.Schema({
  userId: {
	type: mongoose.Schema.Types.ObjectId,
	ref: "User",
	required: true
  },
  skill: {
	type: String,
	required: true,
  },
  level: {
	type: Number,
	required: true
  },
  content: {
	type: [mongoose.Schema.Types.Mixed], // ✅ allows array of any object
	required: false,
	default: []
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("Wallet", WalletSchema);
