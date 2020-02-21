const express = require("express");
const router = express.Router();
const {
    secured,
    isAdmin,
    isAuth,
    userByid
} = require("../../middleware/authMiddleware");

const { createCategory } = require("../../controllers/categoryController");

router.post("/create/:userId", secured, isAuth, isAdmin, createCategory);
router.param("userId", userByid);

module.exports = router;