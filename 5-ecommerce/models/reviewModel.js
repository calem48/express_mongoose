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


// reviewSchema.index({ userId: 1, productId: 1 }, { unique: true })

reviewSchema.statics.calcAvergeRating = async function (productId) {
    const res = await this.aggregate([

        { $match: { productId: productId } },
        {
            $group: {
                _id: null,
                averageRating: { $avg: "$rating" },
                numOfReviews: { $sum: 1 }
            }
        }

    ])

    await this.model("Product").findOneAndUpdate({ _id: productId }, {
        averageRating: res[0]?.averageRating || 0,
        numOfReviews: res[0]?.numOfReviews || 0,
    })
}



reviewSchema.post('save', async function () {
    console.log(reviewSchema);
    this.constructor.calcAvergeRating(this.productId)
})



reviewSchema.post('remove', async function () {
    this.constructor.calcAvergeRating(this.productId)
})




module.exports = mongoose.model("Review", reviewSchema)

/*
reviewSchema.methods.calcAvergeRating = async function (productId) {
    const res = await this.constructor.aggregate([

        { $match: { productId: productId } },
        {
            $group: {
                _id: null,
                averageRating: { $avg: "$rating" },
                numOfReviews: { $sum: 1 }
            }
        }

    ])

    await this.model("Product").findOneAndUpdate({ _id: productId }, {
        averageRating: res[0]?.averageRating || 0,
        numOfReviews: res[0]?.numOfReviews || 0,
    })

}

reviewSchema.post('save', async function () {
    this.calcAvergeRating(this.productId)
})

reviewSchema.post('remove', async function () {
    this.calcAvergeRating(this.productId)
})

*/
