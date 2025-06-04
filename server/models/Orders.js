const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
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
		},
	],
	total: {
		type: Number,
		require: true,
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
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
