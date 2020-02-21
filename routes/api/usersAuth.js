const express = require("express");
const router = express.Router();

// Require signup from controllers
const {
    signup,
    signin,
    signout,
    secured
} = require("../../controllers/userAuth");
const { userValidationRules, validate } = require("../../validator");

router.post("/signup", userValidationRules(), validate, signup);
router.post("/signin", signin);
router.get("/signout", signout);

module.exports = router;