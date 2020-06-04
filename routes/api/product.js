const express = require("express");
const router = express.Router();
const {
	secured,
	isAdmin,
	isAuth,
	userByid,
	productById,
} = require("../../middleware/authMiddleware");

const {
	createProduct,
	getProduct,
	removeProduct,
	updateProduct,
	getAllProducts,
	getRelatedProducts,
	listProductCategories,
	listProductsBySearch,
	getProductPhoto,
} = require("../../controllers/productController");

router.post("/create/:userId", secured, isAuth, isAdmin, createProduct);
// Get Single Product
router.get("/:productId", getProduct);
// Get all products
router.get("/", getAllProducts);
// Get Related Product
router.get("/related/:productId", getRelatedProducts);
// Get Product Categories
router.get("/by/categories", listProductCategories);
// Get Products by search
router.post("/by/search", listProductsBySearch); //Since the search params is coming from d req body,we use post
// Get a particular Product photo
router.get("/photo/:productId", getProductPhoto); //Since the search params is coming from d req body,we use post

router.put("/:productId/:userId", secured, isAuth, isAdmin, updateProduct);
// Only the loggedIn user can delete product, hence d 'userId' in d route
router.delete("/:productId/:userId", secured, isAuth, isAdmin, removeProduct);

router.param("userId", userByid);
router.param("productId", productById);

module.exports = router;
