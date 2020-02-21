const HttpStatus = require("http-status-codes");
const StatusText = require("../lib/constants/constants");
const jwt = require("jsonwebtoken"); //to generate signed token
const expressJwt = require("express-jwt"); //for authorisatn check

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
            return res.status(BAD_REQUEST).json({
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

// Request and await a response - This is what async await is!
exports.signin = async(req, res) => {
    // Find user by email

    try {
        const { email, password } = req.body;
        await User.findOne({ email }, (err, userFound) => {
            if (err || !userFound) {
                return res.status(BAD_REQUEST).send({
                    message: `User with this ${email} does not exist`
                });
            }

            // If user cannot be authenticated
            if (!userFound.authenticate(password)) {
                return res.status(UNAUTHORIZED).send({
                    message: `Email and password don't match`
                });
            }
            // if user is found,ensure that d email&password match- i.e authenticate
            //  If authenticated, generate a signed token wt userId & secret
            let token = jwt.sign({ _id: userFound._id }, process.env.JWT_SECRET);
            token = "Bearer " + token;
            // Persist the token as 't' in cookie with expiry date
            res.cookie("t", token, { expire: new Date() + 9999 });
            // return response with user and token to frontend client/user will send along a token to access a protected route
            const { _id, name, email, role } = userFound;
            return res.json({ token, userFound: { _id, email, name, role } });
        });
    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).send({
            message: HttpStatus.getStatusText(INTERNAL_SERVER_ERROR),
            status: FAIL
        });
    }
};

exports.signout = (req, res) => {
    // To sign out ,you clear the cookie
    res.clearCookie("t");
    res.json({ message: "You have signed out successfully!" });
};