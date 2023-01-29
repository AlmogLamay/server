const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema({
	title: {
		type: String,
		unique: true,
		required: true,
	},
	code: {
		type: String,
		required: true,
	},
	counter: {
		type: Number,
		default: 0,
	},
});

module.exports = mongoose.model('codeblocks', blockSchema);
