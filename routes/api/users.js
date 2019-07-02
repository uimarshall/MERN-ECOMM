const express = require("express");
const router = express.Router();

// Require signup from controllers
const { signup } = require("../../controllers/user");

router.post("/signup", signup);

module.exports = router;
