const express = require("express");
const router = express.Router();
const {
	secured,
	isAdmin,
	isAuth,
	userByid,
	categoryById,
} = require("../../middleware/authMiddleware");

const {
	createCategory,
	getCategory,
	getAllCategory,
	updateCategory,
	removeCategory,
} = require("../../controllers/categoryController");

// Create category
router.post("/create/:userId", secured, isAuth, isAdmin, createCategory);
// Get/Read single category
router.get("/:categoryId", getCategory);
// Get all category
router.get("/", getAllCategory);
// Update category
router.put("/:categoryId/:userId", secured, isAuth, isAdmin, updateCategory);
// Only the loggedIn user can delete product, hence d 'userId' in d route
router.delete("/:categoryId/:userId", secured, isAuth, isAdmin, removeCategory);
router.param("categoryId", categoryById);
router.param("userId", userByid);

module.exports = router;
