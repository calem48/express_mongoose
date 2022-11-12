const mongoose = require('mongoose')


const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: [true, "please provide rating"]
    },
    title: {
        type: String,
        required: [true, "please provide a title"]
    },
    comment: {
        type: String,
        required: [true, "please provide a title"]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Review", reviewSchema)
