
const Product = require("../models/productModel")
const { StatusCodes } = require("http-status-codes")
const { NotFoundError } = require("../errors")

const createProduct = async (req, res) => {
    req.body.userId = req.user.userId
    const product = await Product.create(req.body)
    res.status(StatusCodes.OK).json({ product })
}

const getAllProducts = async (req, res) => {
    const product = await Product.find({})
    res.status(StatusCodes.OK).json({ product, count: product.length })
}


const getSingleProduct = async (req, res) => {
    const product = await Product.findOne({ _id: req.params.id })

    if (!product) {
        throw new NotFoundError('this product not found')
    }

    res.status(StatusCodes.OK).json({ product })
}

const updateProduct = async (req, res) => {
    res.status(200).json("update product")
}

const removeProduct = async (req, res) => {
    res.status(200).json("delete product")
}

const uploadProductImage = async (req, res) => {
    res.status(200).json("upload image")
}

module.exports = { createProduct, getAllProducts, getSingleProduct, updateProduct, removeProduct, uploadProductImage }