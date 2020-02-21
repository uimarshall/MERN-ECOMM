const User = require("../models/User");
const HttpStatus = require("http-status-codes");
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
// The 'id' will come from the route params
exports.userByid = (req, res, next, id) => {
    User.findById(id).exec((err, userFound) => {
        if (err || !userFound) {
            return res.status(BAD_REQUEST).send({
                message: HttpStatus.getStatusText(BAD_REQUEST),
                status: FAIL
            });
        }
        // If user found, then add d user info to d 'req' obj wt d name = 'profile'
        req.profile = userFound;
        // Call next middleware
        next();
    });
};