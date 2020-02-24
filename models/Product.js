const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    description: {
        type: String,

        required: true,
        maxlength: 2064
    },
    price: {
        type: Number,
        trim: true,
        required: true,
        maxlength: 32
    },
    quantity: {
        type: Number
    },
    sold: {
        type: Number,
        default: 0
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    shipping: {
        required: false,
        type: Boolean
    },
    category: {
        type: ObjectId, //product_id in the Category table/collection
        ref: "Category", //product need to belong to a particular category

        required: true
    }
}, { timestamps: true });

module.exports = Product = mongoose.model("product", ProductSchema);