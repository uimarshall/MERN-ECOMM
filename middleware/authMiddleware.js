const User = require("../models/User");
const Product = require("../models/Product");
const Category = require("../models/Category");
const jwt = require("jsonwebtoken"); //to generate signed token
const expressJwt = require("express-jwt"); //for authorisatn check
const HttpStatus = require("http-status-codes");
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
	OK,
} = HttpStatus;

// Auth Middleware
// To use 'expressJwt', you need to install 'cookie-parser' for it to work
exports.secured = expressJwt({
	secret: process.env.JWT_SECRET,
	userProperty: "auth", // This stores the user 'id' that is currently signedIn
});

// Regular User-Authorised currently loggedIn/signin user
exports.isAuth = (req, res, next) => {
	// req.profile._id - authenticated user- who passes a token to signin -'jsonwebtoken'
	// req.auth._id - Authenticated/Authorised user - 'express-jwt'
	// The currently signedIn/authenticated user must match d authorised user to access a protected route -req.profile._id == req.auth._id
	let user = req.profile && req.auth && req.profile._id == req.auth._id; //=== does not work,probably one of them is an 'int
	if (!user) {
		return res.status(FORBIDDEN).json({
			message: HttpStatus.getStatusText(FORBIDDEN),
			status: FAIL,
		});
	}
	console.log(req.auth); //outputs - { _id: '5e4d0576d14e790c14305dfd', iat: 1582279889 }

	next();
};

// Admin User
exports.isAdmin = (req, res, next) => {
	// If not admin user,deny access
	if (req.profile.role === 0) {
		//regular user has role=0
		return res.status(FORBIDDEN).send({
			message: HttpStatus.getStatusText(FORBIDDEN),
			status: FAIL,
		});
	}
	next();
};
/*
This func finds a user by id and populate the user wt info extracted from the token during signin
The user info includes const { _id, name, email, role } = userFound;
The userinfo extracted is used to populate d 'user' in the req object. 
Then the user is made available to any routes needing the info when req is made.
*/
exports.userByid = (req, res, next, id) => {
	//The 'id' will come from the route params
	User.findById(id).exec((err, userFound) => {
		if (err || !userFound) {
			return res.status(BAD_REQUEST).json({
				message: HttpStatus.getStatusText(BAD_REQUEST),
				status: FAIL,
			});
		}
		// If user found, then add d user info to d 'req' obj wt d key = 'profile' & value='userFound'
		req.profile = userFound; // i.e req = {profile:userFound}
		console.log("request.profile", req.profile);
		// Call next middleware
		next();
	});
};

// Product Middleware
exports.productById = (req, res, next, id) => {
	Product.findById(id).exec((err, productFound) => {
		if (err || !productFound) {
			return res.status(BAD_REQUEST).send({
				error: "Product not found!",
			});
		}

		req.product = productFound; //productFound is stored in 'req.product'
		console.log("request.product", req.product);
		// Call next middleware
		next();
	});
};
// Category Middleware
exports.categoryById = (req, res, next, id) => {
	Category.findById(id).exec((err, categoryFound) => {
		if (err || !categoryFound) {
			return res.status(BAD_REQUEST).send({
				error: "Category does not exist!",
			});
		}

		req.category = categoryFound;

		// Call next middleware
		next();
	});
};
