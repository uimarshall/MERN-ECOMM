const express = require("express");
const router = express.Router();
const {
    secured,
    isAdmin,
    isAuth,
    userByid
} = require("../../middleware/authMiddleware");
const { getUser, updateUser } = require("../../controllers/userAuthController");

router.get("/secret/:userId", secured, isAuth, (req, res) => {
    res.json({ user: req.profile });
});

// Get Single User
router.get("/:userId", secured, isAuth, getUser);
// Update User
router.put("/:userId", secured, isAuth, updateUser);

// Anytime there is a 'userId', param in the route we run the userByid middleware which make d user info available in the 'req' obj thru the 'req.profile'
// A user is returned based on the 'id' sent in d route params
router.param("userId", userByid);

module.exports = router;