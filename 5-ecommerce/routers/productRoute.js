
const express = require("express")
const {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    removeProduct,
    uploadProductImage
} = require("../controllers/productController")
const { getSingleProductReviews } = require("../controllers/reviewController")

const { auth, authorizedPermission } = require("../middleware/auth")

const router = express.Router()


router
    .route('/')
    .get(auth, authorizedPermission('admin'), getAllProducts)
    .post(auth, authorizedPermission('admin'), createProduct)

router
    .route('/uploadImage')
    .post(auth, authorizedPermission('admin'), uploadProductImage)

router
    .route('/:id')
    .patch(auth, authorizedPermission('admin'), updateProduct)
    .delete(auth, authorizedPermission('admin'), removeProduct)
    .get(getSingleProduct)

router
    .route('/:id/reviews')
    .get(getSingleProductReviews)



module.exports = router