const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
	orderNumber: {
		type: Number,
		unique: true,
	},
	customerName: {
		type: String,
		required: true,
		trim: true,
	},
	customerId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Customer",
		required: true,
	},
	orderList: [
		{
			id: {
				type: String,
				required: true,
			},
			name: {
				type: String,
				required: true,
			},
			price: {
				type: Number,
				required: true,
			},
			count: {
				type: Number,
				require: true,
			},
		},
	],
	total: {
		type: Number,
		require: true,
	},
	delivered: {
		type: Boolean,
		enum: [true, false],
		default: false,
	},
	paid: {
		type: Boolean,
		enum: [true, false],
		default: false,
	},

	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	lastUpdateDate: {
		type: Date,
		default: Date.now,
	},
	updatedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		default: null,
	},
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
