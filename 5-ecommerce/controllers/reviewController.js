
const Review = require('../models/reviewModel')
const Product = require("../models/productModel")
const { StatusCodes } = require('http-status-codes')
const { NotFoundError } = require('../errors')
const { checkPermission } = require('../utils')

const createReview = async (req, res) => {
    req.body.userId = req.user.userId

    const isValidProduct = await Product.findOne({ _id: req.body.productId })

    if (!isValidProduct) {
        throw new NotFoundError("this is not valid ID")
    }

    const isReview = await Review.findOne({
        productId: req.body.productId,
        userId: req.user.userId
    })

    if (isReview) {
        throw new NotFoundError("you have reviewed before")
    }

    const review = await Review.create(req.body)

    res.status(StatusCodes.CREATED).json({ review })
}

const getAllReview = async (req, res) => {
    const review = await Review.find({})
        // .populate('productId userId')
        .populate({ path: "productId", select: 'name company price' })
        .populate({ path: "userId", select: 'name email -_id' })
    res.status(StatusCodes.CREATED).json({ review, count: review.length })
}

const getSingleReview = async (req, res) => {
    const review = await Review.findOne({ _id: req.params.id })
    if (!review) {
        throw new NotFoundError('not found product')
    }
    res.status(StatusCodes.CREATED).json({ review })
}

const removeReview = async (req, res) => {
    // const review = await Review.findOneAndDelete({ id: req.params.id })
    const review = await Review.findOne({ _id: req.params.id })

    if (!review) {
        throw new NotFoundError('not found product')
    }
    checkPermission(req.user, review.userId)
    await review.remove()
    res.status(StatusCodes.CREATED).json({ msg: 'success remove' })
}

const updateReview = async (req, res) => {

    const { rating, comment, title } = req.body
    //here we must not to use this way because we can't check permission so we use findOne
    // const review = await Review.findByIdAndUpdate({ _id: req.params.id }, { rating, comment, title }, { new: true })
    const review = await Review.findOne({ _id: req.params.id })

    if (!review) {
        throw new NotFoundError('review you try updated doesn\'t exist')
    }


    checkPermission(req.user, review.userId)

    review.rating = rating
    review.comment = comment
    review.title = title

    await review.save()

    res.status(StatusCodes.CREATED).json({ review })
}

const getSingleProductReviews = async (req, res) => {
    const reviews = await Review.find({ productId: req.params.id })
    res.status(StatusCodes.OK).json(reviews)
}

module.exports = { createReview, getAllReview, getSingleReview, removeReview, updateReview, getSingleProductReviews }