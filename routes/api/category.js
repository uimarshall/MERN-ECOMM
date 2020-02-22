const express = require("express");
const router = express.Router();
const {
    secured,
    isAdmin,
    isAuth,
    userByid,
    categoryById
} = require("../../middleware/authMiddleware");

const { createCategory, getCategory } = require("../../controllers/categoryController");

router.get("/:categoryId", getCategory);
router.post("/create/:userId", secured, isAuth, isAdmin, createCategory);
router.param("categoryId", categoryById);
router.param("userId", userByid);

module.exports = router;