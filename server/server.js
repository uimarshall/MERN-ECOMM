const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
// We will be storing the user Credentials in the cookie
const cookieParser = require("cookie-parser");

// Load the environment variables
require("dotenv").config();
const usersRoute = require("../routes/api/users");

// Initialise app
const app = express();

// Connect Db
const db = process.env.MONGO_URI;
mongoose
	.connect(db, {
		useNewUrlParser: true,
		useCreateIndex: true
	})
	.then(() => {
		console.log("Database Connected!");
	});

// Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

// Routes Middleware
app.use("/api/users", usersRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
