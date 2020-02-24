const formidable = require("formidable");
const lodash = require("lodash");
const fs = require("fs");
const Product = require("../models/Product");
const HttpStatus = require("http-status-codes");
const { errorHandler } = require("../utils/dbErrorHandler");
const StatusText = require("../lib/constants/constants");
const { ERROR, FAIL, SUCCESS } = StatusText;
const {
    ACCEPTED,
    BAD_REQUEST,
    CREATED,
    INTERNAL_SERVER_ERROR,
    NOT_FOUND,
    UNAUTHORIZED,
    FORBIDDEN,
    OK
} = HttpStatus;

exports.createProduct = async(req, res) => {
    try {
        // Handle form data using 'formidable' pkg
        let form = await new formidable.IncomingForm(); //Handle input from forms/FE
        form.keepExtensions = true; //whatever img type is uploaded will keep their extensions
        form.parse(req, async(err, fields, files) => {
            if (err) {
                return res.status(BAD_REQUEST).json({
                    error: "Image could not be uploaded"
                });
            }

            // Check for all fields
            const { name, description, price, category, quantity, shipping } = fields;
            if (!name ||
                !description ||
                !price ||
                !category ||
                !quantity ||
                !shipping
            ) {
                return res.status(BAD_REQUEST).json({
                    error: "All fields are required"
                });
            }
            let newProduct = new Product(fields);
            //Check if any photo is coming from client side
            // 1mb =1000000
            if (files.photo) {
                console.log("FILES PHOTO", files.photo);
                if (files.photo.size > 1000000) {
                    return res.status(BAD_REQUEST).json({
                        err: "Image should be less than 1mb in size"
                    });
                }
                newProduct.photo.data = fs.readFileSync(files.photo.path);
                newProduct.photo.contentType = files.photo.type;
            }
            const productCreated = await newProduct.save();
            return res.status(CREATED).json({
                data: productCreated,
                message: SUCCESS
            });
        });
    } catch (error) {
        if (error) {
            return res.status(FORBIDDEN).send({
                message: HttpStatus.getStatusText(FORBIDDEN),
                status: FAIL
            });
        }
    }
};

// Get Product
exports.getProduct = (req, res) => {
    req.product.photo = undefined;
    return res.status(CREATED).json({
        data: req.product,
        message: SUCCESS
    });
};

// Update Product
exports.updateProduct = async(req, res) => {
    try {
        // Handle form data using 'formidable' pkg
        let form = await new formidable.IncomingForm(); //Handle input from forms/FE
        form.keepExtensions = true; //whatever img type is uploaded will keep their extensions
        form.parse(req, async(err, fields, files) => {
            if (err) {
                return res.status(BAD_REQUEST).json({
                    error: "Image could not be uploaded"
                });
            }

            // Check for all fields
            const { name, description, price, category, quantity, shipping } = fields;
            if (!name ||
                !description ||
                !price ||
                !category ||
                !quantity ||
                !shipping
            ) {
                return res.status(BAD_REQUEST).json({
                    error: "All fields are required"
                });
            }
            let newProduct = req.product;
            // Take the current product and update it wt incoming 'fields' frm the form
            newProduct = lodash.extend(newProduct, fields);
            //Check if any photo is coming from client side
            // 1mb =1000000
            if (files.photo) {
                console.log("FILES PHOTO", files.photo);
                if (files.photo.size > 1000000) {
                    return res.status(BAD_REQUEST).json({
                        err: "Image should be less than 1mb in size"
                    });
                }
                newProduct.photo.data = fs.readFileSync(files.photo.path);
                newProduct.photo.contentType = files.photo.type;
            }
            const productCreated = await newProduct.save();
            return res.status(CREATED).json({
                data: productCreated,
                message: SUCCESS
            });
        });
    } catch (error) {
        if (error) {
            return res.status(FORBIDDEN).send({
                message: HttpStatus.getStatusText(FORBIDDEN),
                status: FAIL
            });
        }
    }
};

// Delete Product
exports.removeProduct = async(req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if (err) {
            return res.status(BAD_REQUEST).json({
                message: HttpStatus.getStatusText(BAD_REQUEST),
                status: FAIL
            });
        }
        res.status(OK).json({
            message: "Product deleted Successfully"
        });
    });
};

/** Query Params indicated by '?' is attached to 'req.query'
 * Products by Qty-sold/Arrival as requested by users
 * ================By qtySold=============================
 * Route = /products?sortBy=sold&order=desc&limit=4
 * ordering will be based on the product sold more, descending order(desc)
 * 4-of highest sold product will be displayed, hence limit 4
 *  ===============By Arrival=============================
 * Route = /products?sortBy=createdAt&order=desc&limit=4
 * 'createdAt' represents the time the product was created in Db or arrived
 * Latest arrival will be displayed 1st, like stack-last in first out,hence sortBy=createdAt
 * If no params are sent, then all products are returned
 */

// Get All Products

exports.getAllProducts = (req, res) => {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;
    Product.find()
        .select("-photo") //deselect photo bcos its too heavy and will slow down response
        .populate("Category") //Populate the category table/collection
        .sort([
            [sortBy, order]
        ])
        .limit(limit)
        .exec((err, productsFound) => {
            console.log(productsFound);
            if (err) {
                return res.status(BAD_REQUEST).json({
                    message: HttpStatus.getStatusText(BAD_REQUEST),
                    status: FAIL
                });
            }
            return res.status(ACCEPTED).json({
                data: productsFound,
                message: SUCCESS
            });
        });
};