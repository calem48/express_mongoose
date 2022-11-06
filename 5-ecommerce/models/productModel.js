const mongoose = require("mongoose")


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide  product name"]
    },
    price: {
        type: Number,
        required: [true, "please provide  product price"],
        default: 0
    },
    description: {
        type: String,
        required: [true, "please provide  product description"]
    },
    image: {
        type: String,
        required: [true, "please provide  product image"],
        default: "/uploads/example.jpeg"
    },
    category: {
        type: String,
        required: [true, "please provide  product category"],
        enum: ["office", "kitchen", "bedroom"]
    },
    company: {
        type: String,
        required: [true, "please provide  product company"],
        enum: {
            values: ["ikea", "liddy", "marcos"],
            message: "{VALUE} is not support "
        }
    },
    colors: {
        type: [String],
        default: ["#222"],
        required: true,
    },
    featured: {
        type: Boolean,
        default: false
    },
    freeShipping: {
        type: Boolean,
        default: false
    },
    inventory: {
        type: Number,
        required: true,
        default: 15,
    },
    averageRating: {
        type: Number,
        default: 0,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true })


module.exports = mongoose.model("Product", productSchema)