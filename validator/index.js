// exports.userSignupValidator = (req, res, next) => {
//     req.check("name", "Name is required").notEmpty();
//     req
//         .check("email", "Email must be between 3 to 25 characters")
//         .matches(/.+\@.+\..+/)
//         .withMessage("Email must contain @")
//         .isLength({
//             min: 4,
//             max: 32
//         });
//     req.check("password", "Password is required").notEmpty();
//     req
//         .check(password)
//         .isLength({ min: 6 })
//         .withMessage("Password must contain at least 6 characters")
//         .matches(/\d/)
//         .withMessage("Password must contain a number");
//     // Grab all errors
//     const errors = req.validationErrors();
//     if (errors) {
//         const firstError = errors.map(error => error.msg)[0];
//         return res.status(400).json({ error: firstError });
//     }
//     // No matter what happens, the code should continue to execute
//     next();
// };

// ==================METHOD 2=========================
const { body, validationResult } = require("express-validator");
const userValidationRules = () => {
    return [
        // body("username").isEmail(),
        body("name", "Name is required").notEmpty(),
        // Email validation
        body("email", "Email must be between 4 to 25 characters")
        .matches(/.+\@.+\..+/)
        .withMessage("Email must contain @")
        .isLength({
            min: 4,
            max: 25
        }),

        // password must be at least 6 chars long

        body("password", "Password is required")
        .notEmpty()

        .isLength({ min: 6 })
        .withMessage("Password must contain at least 6 characters")
        .matches(/\d/)
        .withMessage("Password must contain a number")
    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map(err =>
        extractedErrors.push({
            [err.param]: err.msg
        })
    );

    return res.status(422).json({
        errors: extractedErrors
    });
};

module.exports = {
    userValidationRules,
    validate
};