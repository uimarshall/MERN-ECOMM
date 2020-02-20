const HttpStatus = require("http-status-codes");
const StatusText = require("../lib/constants/constants");
const User = require("../models/User");

const { errorHandler } = require("../utils/dbErrorHandler");
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
exports.signup = async(req, res) => {
    try {
        console.log("req.body", req.body);
        const newUser = await new User(req.body);
        const userCreated = await newUser.save();
        // const userCreated = await User.create(req.body);
        return res.status(CREATED).json({
            // The userCreated is an object
            data: userCreated,
            status: SUCCESS
        });
    } catch (err) {
        if (err) {
            return res.status(INTERNAL_SERVER_ERROR).json({
                err: errorHandler(err)
            });
        }
        // Return Empty list if 'req.body' is does not return anything
        return res.status(INTERNAL_SERVER_ERROR).send({
            message: HttpStatus.getStatusText(INTERNAL_SERVER_ERROR),
            status: FAIL
        });
    }
};
// exports.signup = (req, res) => {
//     console.log("req.body", req.body);
//     const user = new User(req.body);
//     user.save((err, user) => {
//         if (err) {
//             return res.status(400).json({
//                 err
//             });
//         }
//         res.json({
//             user
//         });
//     });
// };