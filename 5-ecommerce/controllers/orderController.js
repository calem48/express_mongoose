const Order = require('../models/orderModel')
const Product = require('../models/productModel')
const { StatusCodes } = require("http-status-codes")
const customError = require('../errors')
const { checkPermission } = require('../utils')


const getAllOrders = async (req, res) => {
    const orders = await Order.find({});
    res.status(StatusCodes.OK).json({ orders, count: orders.length });
}

const getSingleOrder = async (req, res) => {
    const { id: orderId } = req.params;
    const order = await Order.findOne({ _id: orderId });
    if (!order) {
        throw new customError.NotFoundError(`No order with id : ${orderId}`);
    }
    checkPermission(req.user, order.userId);
    res.status(StatusCodes.OK).json({ order });
}


const getCurrentUserOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user.userId });
    res.status(StatusCodes.OK).json({ orders, count: orders.length });
}

const createOrder = async (req, res) => {

    const { items, shippingFee } = req.body

    if (!items || items.length < 1) {
        throw new customError.BadRequestError('no items in cart')
    }

    if (!shippingFee) {
        throw new customError.BadRequestError('please provide shipping fee')
    }

    let orderItems = [];
    // let subtotal = 0;

    for (const item of items) {
        const product = await Product.findOne({ _id: item.productId })
        if (!product) {
            customError.NotFoundError('this product does not exist')
        }

        const { name, image, price, _id } = product

        const eachSingleProductInCart = { name, price, image, productId: _id, amount: item.amount }

        orderItems = [...orderItems, eachSingleProductInCart]
        // subtotal += price * item.amount
    }

    // let total = subtotal + shippingFee


    const order = await Order.create({
        shippingFee,
        orderItems,
        // subtotal,
        // total,
        userId: req.user.userId
    })


    res.status(StatusCodes.OK).json(order)
}

const updateOrder = async (req, res) => {
    const { id: orderId } = req.params;
    const order = await Order.findOne({ _id: orderId });
    if (!order) {
        throw new customError.NotFoundError(`No order with id : ${orderId}`);
    }
    checkPermission(req.user, order.userId);

    order.status = "paid"
    await order.save()

    res.status(StatusCodes.OK).json({ order });
}


module.exports = {
    getAllOrders,
    getSingleOrder,
    getCurrentUserOrders,
    createOrder,
    updateOrder,
};

