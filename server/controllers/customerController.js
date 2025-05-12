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
	editCustomer: asyncHandler(async (req, res) => {
		console.log("These are", req.body, req.user.id);
		let data = await Customer.findByIdAndUpdate(req.params.id, {
			$set: {
				...req.body,
				lastUpdateDate: new Date(),
				lastUpdateBy: req.user.id,
			},
		});
		console.log("This is data", data);
		if (data) {
			res.status(201).json({ msg: "Customer Updated" });
		} else {
			res.status(404).json({ msg: "Customer not found" });
		}
	}),
	deleteCustomer: asyncHandler(async (req, res) => {
		let data = await Customer.findByIdAndDelete(req.params.id);
		if (data) {
			res.status(201).json({ msg: "Customer Deleted" });
		} else {
			res.status(404).json({ msg: "Customer not found" });
		}
	}),
	getCustomerById: asyncHandler(async (req, res) => {
		let data = await Customer.findById(req.params.id);
		if (data) {
			res.status(200).json(data);
		} else {
			res.status(404).json({ msg: "Customer not found" });
		}
	}),
};
