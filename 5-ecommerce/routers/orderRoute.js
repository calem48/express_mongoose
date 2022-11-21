const express = require("express")
const {
    getAllOrders,
    getSingleOrder,
    getCurrentUserOrders,
    createOrder,
    updateOrder,
} = require("../controllers/orderController")


const { auth, authorizedPermission } = require("../middleware/auth")

const router = express.Router()



router
    .route('/')
    .post(auth, createOrder)
    .get(auth, authorizedPermission("admin"), getAllOrders)

router
    .route('/myAllOrders')
    .get(auth, getCurrentUserOrders)

router
    .route('/:id')
    .get(auth, getSingleOrder)
    .patch(auth, updateOrder)




module.exports = router;