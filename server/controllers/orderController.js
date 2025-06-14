const Order = require("../models/Order");
const asyncHandler = require("express-async-handler");

module.exports = {
	getAllOrder: asyncHandler(async (req, res) => {
		let data = await Order.find().sort({ createdAt: -1 });
		res.json(data);
	}),
	newOrder: asyncHandler(async (req, res) => {
		let data = Order.create(req.body);
		if (data) {
			console.log(data);
			res.status(201).json({ msg: "Order Added" });
		}
	}),
};
