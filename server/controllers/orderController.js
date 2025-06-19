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
	updateOrder: asyncHandler(async (req, res) => {
		const { id } = req.params;
		const { orderPaid, deliver } = req.body;

		const updatedOrder = await Order.findByIdAndUpdate(id, {
			$set: {
				...req.body,
				lastUpdateDate: new Date(),
				lastUpdateBy: req.user.id,
			},
		});

		if (!updatedOrder) {
			return res.status(404).json({ msg: "Order not found" });
		}

		res.json({ msg: "Order updated", order: updatedOrder });
	}),
};
