
const Product = require('../models/Product')

const getAllProducts = async (req, res) => {
    const products = await Product.find({})
    res.status(200).json({ msg: 'get all product', products })
}

const createProduct = async (req, res) => {
    const product = await Product.create({ ...req.body })
    res.status(200).json({ msg: 'created', product })
}

module.exports = { getAllProducts, createProduct }