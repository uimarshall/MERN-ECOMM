const express = require("express");
const router = express.Router();
const {
    secured,
    isAdmin,
    isAuth,
    userByid,
    categoryById
} = require("../../middleware/authMiddleware");

const { createCategory, getCategory, getAllCategory, updateCategory, removeCategory } = require("../../controllers/categoryController");


router.post("/create/:userId", secured, isAuth, isAdmin, createCategory);
router.get("/:categoryId", getCategory);
router.get("/", getAllCategory);

router.put("/:categoryId/:userId", secured, isAuth, isAdmin, updateCategory);
// Only the loggedIn user can delete product, hence d 'userId' in d route
router.delete("/:categoryId/:userId", secured, isAuth, isAdmin, removeCategory);
router.param("categoryId", categoryById);
router.param("userId", userByid);

module.exports = router;