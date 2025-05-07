const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
	customerName: {
		type: String,
		required: true,
		trim: true,
	},
	contactName: {
		type: String,
		required: true,
		trim: true,
	},
	contactEmail: {
		type: String,
		required: true,
	},
	contactPhone: {
		type: String,
		required: true,
	},
	contactName2: {
		type: String,
		trim: true,
	},
	contactEmail2: {
		type: String,
	},
	contactPhone2: {
		type: String,
	},
	customerAddress: {
		type: String,
		trim: true,
		required: true,
	},
	customerType: {
		type: String,
		required: true,
		enum: ["Retailer", "Business", "Wholesaler", "Distributor", "Other"],
	},
	customerRegion: {
		type: String,
		required: true,
		trim: true,
	},

	customerCountry: {
		type: String,
		trim: true,
		required: true,
		default: "Tanzania",
	},
	lastUpdateDate: {
		type: Date,
		default: Date.now,
	},
	lastUpdateBy: {
		type: mongoose.Schema.Types.ObjectId, // References a user ID
		ref: "User", // Assumes a User model exists
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
