const HttpStatus = require("http-status-codes");
const StatusText = require("../lib/constants/constants");
const User = require("../models/User");
const { ERROR, FAIL, SUCCESS } = StatusText;
const {
	ACCEPTED,
	BAD_REQUEST,
	CREATED,
	INTERNAL_SERVER_ERROR,
	NOT_FOUND,
	UNAUTHORIZED
} = HttpStatus;
exports.signup = async (req, res) => {
	try {
		console.log("req.body", req.body);
		const newUser = new User(req.body);
		const userCreated = await newUser.save();
		return res.status(CREATED).send({
			// The userCreated is an object
			data: { userCreated },
			status: SUCCESS
		});
	} catch (err) {
		// Return Empty list if 'req.body' is does not return anything
		return res.status(INTERNAL_SERVER_ERROR).send({
			message: HttpStatus.getStatusText(INTERNAL_SERVER_ERROR),
			status: FAIL
		});
	}
};
