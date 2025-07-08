const mongoose = require("mongoose");

const CertificateSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	title: {
		type: String,
		required: true,
	},
	provider: {
		type: String,
		required: true,
	},
	industry: {
		type: String,
		required: true,
	},
	skill: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	duration: {
		type: String,
		required: true,
	},
	credentials: {
		type: String,
		required: false,
	},
	description: {
		type: String,
		required: true,
	},
	tools: {
		type: [String],
		required: true,
	},
	imageUrl: {
		type: String,
		default: "",
	},
	paid: {
		type: Number,
		required: false,
	},
}, {
  timestamps: true
});

module.exports = mongoose.model("Certificate", CertificateSchema);
