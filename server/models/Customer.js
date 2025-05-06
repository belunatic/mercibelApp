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
		type: string,
		required: true,
	},
	contactPhone: {
		type: string,
		required: true,
	},
	contactName2: {
		type: String,
		trim: true,
	},
	contactEmail2: {
		type: string,
	},
	contactPhone2: {
		type: string,
	},
	customerAddress: {
		type: String,
		trim: true,
		required: true,
	},
	customerType: {
		type: string,
		required: true,
		enum: ["Retailer", "Business", "Wholesaler", "Distributor", "Other"],
	},
	CustomerRegion: {
		type: string,
		required: true,
		trim: true,
	},

	CustomerCountry: {
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

const Customer = mongoose.model("Customer", productSchema);

module.exports = Customer;
