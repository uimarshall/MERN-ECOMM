const express = require("express");
const router = express.Router();

// Require signup from controllers
const { signup } = require("../../controllers/user");
const { userValidationRules, validate } = require("../../validator");

router.post("/signup", userValidationRules(), validate, signup);

module.exports = router;