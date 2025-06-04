const Order = require("../models/Order");
const asyncHandler = require("express-async-handler");

module.exports = {
	getAllOrder: asyncHandler(async (req, res) => {
		let data = await Order.find();
		res.json(data);
	}),
	newOrder: asyncHandler(async (req, res) => {
		console.log("the body", req.body);
		console.log("the user", req.user.id);
	}),
};
