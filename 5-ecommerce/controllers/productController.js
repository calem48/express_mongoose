
const Product = require("../models/productModel")
const { StatusCodes } = require("http-status-codes")
const { NotFoundError, BadRequestError } = require("../errors")
const path = require("path")

const createProduct = async (req, res) => {
    req.body.userId = req.user.userId
    const product = await Product.create(req.body)
    res.status(StatusCodes.CREATED).json({ product })
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
    const product = await Product.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
    if (!product) {
        throw new NotFoundError('this product not found')
    }
    res.status(StatusCodes.OK).json({ product })
}

const removeProduct = async (req, res) => {
    // const product = await Product.findByIdAndDelete({ _id: req.params.id })
    const product = await Product.findOne({ _id: req.params.id })

    if (!product) {
        throw new NotFoundError('this product not found')
    }
    await product.remove()

    res.status(200).json({ msg: "delete product" })
}

const uploadProductImage = async (req, res) => {
    if (!req.files) {
        throw new BadRequestError("No file uploaded")
    }

    const getImage = req.files.image

    if (!getImage.mimetype.startsWith("image")) {
        throw new BadRequestError("please upload image")
    }

    if (getImage.size > 1024 * 1024) {
        throw new BadRequestError("please upload size less than 1MB")
    }

    const getPath = path.join(__dirname, "../public/uploads/" + getImage.name)

    await getImage.mv(getPath)

    res.status(StatusCodes.OK).json({ image: `/uploads/${getImage.name}` })
}

module.exports = { createProduct, getAllProducts, getSingleProduct, updateProduct, removeProduct, uploadProductImage }