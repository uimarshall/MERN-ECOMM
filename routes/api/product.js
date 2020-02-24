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
    getAllProducts
} = require("../../controllers/productController");

router.post("/create/:userId", secured, isAuth, isAdmin, createProduct);
router.get("/:productId", getProduct);
router.get("/", getAllProducts);

router.put("/:productId/:userId", secured, isAuth, isAdmin, updateProduct);
// Only the loggedIn user can delete product, hence d 'userId' in d route
router.delete("/:productId/:userId", secured, isAuth, isAdmin, removeProduct);

router.param("userId", userByid);
router.param("productId", productById);

module.exports = router;