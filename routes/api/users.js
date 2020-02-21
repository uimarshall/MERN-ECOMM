const express = require("express");
const router = express.Router();
const { secured, isAdmin, isAuth } = require("../../controllers/userAuth");

const { userByid } = require("../../controllers/user");
router.get("/secret/:userId", secured, isAuth, (req, res) => {
    res.json({ user: req.profile });
});

// Anytime there is a user id, we run the userByid middleware which make d user info available thru the 'req.profile'
router.param("userId", userByid);

module.exports = router;