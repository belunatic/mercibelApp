const Customer = require("../models/Customer");
const asyncHandler = require("express-async-handler");

module.exports = {
	getCustomer: asyncHandler(async (req, res) => {
		let data = await Customer.find();
		res.json(data);
	}),
	newCustomer: asyncHandler(async (req, res) => {
		let data = await Customer.create(req.body);
		console.log(data);
		if (data) {
			res.status(201).json({ msg: "Customer Added" });
		}
	}),
};
