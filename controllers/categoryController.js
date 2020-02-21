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
    OK
} = HttpStatus;

exports.createCategory = async(req, res) => {
    try {
        const newCategory = await new Category(req.body);
        const catgoryCreated = await newCategory.save();
        return res.status(CREATED).json({
            data: catgoryCreated,
            message: SUCCESS
        });
    } catch (error) {
        if (error) {
            return res.status(FORBIDDEN).send({
                message: HttpStatus.getStatusText(FORBIDDEN),
                status: FAIL
            });
        }
    }
};