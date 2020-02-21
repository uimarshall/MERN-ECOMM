const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto"); //for password hashing
const uuidv1 = require("uuid/v1");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    hashed_password: {
        //hash version of the password will be saved to Db
        type: String,
        required: true
    },
    about: {
        type: String,
        trim: true
    },
    salt: String, //will be used to hash the password
    role: {
        //   Roles will either be admin or regular user, 0 for regular user, 1 for admin for validation
        type: Number,
        default: 0
    },
    history: {
        //   Purchase HIstory for user
        type: Array,
        default: []
    }
}, { timestamps: true });

// Virtual field
// With the mongoose Schema we can add virtual fields and mtds
// `password` will be the virtual since we're sending it from the client side
userSchema
    .virtual("password")
    .set(function(password) {
        this._password = password;
        this.salt = uuidv1(); //'uuid' will give a random string while 'salt' will hash it.
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

// How to add functions to userSchema
userSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    encryptPassword: function(password) {
        if (!password) return "";
        try {
            return crypto
                .createHmac("sha1", this.salt)
                .update(password)
                .digest("hex");
        } catch (err) {
            return "";
        }
    }
};

module.exports = mongoose.model("User", userSchema);

// module.exports = User = mongoose.model("users", UserSchema);