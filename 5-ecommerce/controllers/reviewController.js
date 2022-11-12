
const { StatusCodes } = require('http-status-codes')

const createReview = async (req, res) => {
    res.status(StatusCodes.CREATED).json("created")
}

const getAllReview = async (req, res) => {
    res.status(StatusCodes.CREATED).json("get all ")
}

const getSingleReview = async (req, res) => {
    res.status(StatusCodes.CREATED).json("single")
}

const removeReview = async (req, res) => {
    res.status(StatusCodes.CREATED).json("remove")
}

const updateReview = async (req, res) => {
    res.status(StatusCodes.CREATED).json("update")
}

module.exports = { createReview, getAllReview, getSingleReview, removeReview, updateReview }