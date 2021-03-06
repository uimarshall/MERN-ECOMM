const Category = require("../models/Category");
const HttpStatus = require("http-status-codes");
const { errorHandler } = require("../utils/dbErrorHandler");
const StatusText = require("../lib/constants/constants");
const { ERROR, FAIL, SUCCESS } = StatusText;
const {
	ACCEPTED,
	BAD_REQUEST,
	CREATED,
	INTERNAL_SERVER_ERROR,
	NOT_FOUND,
	UNAUTHORIZED,
	FORBIDDEN,
	OK,
} = HttpStatus;

// Create Category
exports.createCategory = async (req, res) => {
	try {
		const newCategory = await new Category(req.body);
		const catgoryCreated = await newCategory.save();

		return res.status(CREATED).json({
			data: catgoryCreated,
			message: SUCCESS,
		});
	} catch (err) {
		if (err) {
			return res.status(BAD_REQUEST).json({
				error: errorHandler(err),
				status: FAIL,
			});
		}
	}
};

// Read/Get Category
exports.getCategory = (req, res) => {
	return res.status(CREATED).json({
		data: req.category,
		message: SUCCESS,
	});
};
// Read/Get All Category

exports.getAllCategory = (req, res) => {
	Category.find().exec((err, categoriesFound) => {
		console.log(categoriesFound);
		if (err) {
			return res.status(BAD_REQUEST).json({
				message: errorHandler(err),
				status: FAIL,
			});
		}
		return res.status(ACCEPTED).json({
			data: categoriesFound,
			message: SUCCESS,
		});
	});
};

// Update Category
exports.updateCategory = async (req, res) => {
	try {
		const category = req.category;
		category.name = await req.body.name; //update the 'name'pty with what is cominfg from d req body
		const updatedCategory = await category.save();
		return res.status(CREATED).json({
			data: updatedCategory,
			message: SUCCESS,
		});
	} catch (error) {
		return res.status(FORBIDDEN).send({
			message: errorHandler(error),
			status: FAIL,
		});
	}
};

// Delete Category

exports.removeCategory = async (req, res) => {
	let category = req.category;
	category.remove((err, deletedCategory) => {
		if (err) {
			return res.status(BAD_REQUEST).json({
				message: errorHandler(err),
				status: FAIL,
			});
		}
		res.status(OK).json({
			message: "Category deleted Successfully",
		});
	});
};
