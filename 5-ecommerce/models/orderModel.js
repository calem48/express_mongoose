const mongoose = require('mongoose');

const SingleOrderItemSchema = mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    amount: { type: Number, required: true },
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true,
    }
});

const OrderSchema = mongoose.Schema(
    {

        shippingFee: {
            type: Number,
            required: true,
        },
        orderItems: [SingleOrderItemSchema]
        // orderItems: [
        //     {
        //         name: { type: String, required: true },
        //         image: { type: String, required: true },
        //         price: { type: Number, required: true },
        //         amount: { type: Number, required: true },
        //         productId: {
        //             type: mongoose.Schema.ObjectId,
        //             ref: 'Product',
        //             required: true,
        //         }
        //     }
        // ]

        ,
        // subtotal: {
        //     type: Number,
        //     required: true,
        // },
        // total: {
        //     type: Number,
        //     required: true,
        // },
        status: {
            type: String,
            enum: ['pending', 'failed', 'paid', 'delivered', 'canceled'],
            default: 'pending',
        },
        userId: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        }

    },
    { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
