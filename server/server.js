const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
// We will be storing the user Credentials in the cookie
const cookieParser = require("cookie-parser");
// const expressValidator = require("express-validator");

const path = require("path");
const dotenv = require("dotenv");

// Load the environment variables
dotenv.config({ path: "./config/.env" });
const connectDb = require("../config/db");
const usersRoute = require("../routes/api/users");

// Initialise app
const app = express();

// Connect Db
connectDb();

// Middlewares
app.use(morgan("dev"));
// app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
// app.use(expressValidator());

// Routes Middleware
app.use("/api/users", usersRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});