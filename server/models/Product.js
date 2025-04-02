const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	category: {
		type: String,
		required: true,
		enum: ["grain", "flour", "oil", "other"],
	},
	price: {
		type: Number,
		required: true,
		min: 0,
	},
	quantity: {
		type: Number,
		required: true,
		min: 0,
	},
	// sizes: {
	// 	type: [String], // Array of sizes, e.g., ["2kg", "25kg"]
	// 	required: true,
	// },
	description: {
		type: String,
		trim: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},

	lastUpdateBy: {
		type: Date,
		default: Date.now,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId, // References a user ID
		ref: "User", // Assumes a User model exists
		required: true,
	},
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
