const express = require("express");
const router = express.Router();
const {
    secured,
    isAdmin,
    isAuth,
    userByid,
    productById
} = require("../../middleware/authMiddleware");

const {
    createProduct,
    getProduct,
    removeProduct,
    updateProduct,
    getAllProducts,
    getRelatedProducts
} = require("../../controllers/productController");

router.post("/create/:userId", secured, isAuth, isAdmin, createProduct);
// Get Single Product
router.get("/:productId", getProduct);
// Get all products
router.get("/", getAllProducts);
// Get Related Product
router.get("/related/:productId", getRelatedProducts);

router.put("/:productId/:userId", secured, isAuth, isAdmin, updateProduct);
// Only the loggedIn user can delete product, hence d 'userId' in d route
router.delete("/:productId/:userId", secured, isAuth, isAdmin, removeProduct);

router.param("userId", userByid);
router.param("productId", productById);

module.exports = router;