const express = require('express')
const router = express.Router()

const { getAllProducts, createProduct } = require("../controllers/productController");
const { uploadProductImageLocal } = require("../controllers/uploadsController");

router.route("/").get(getAllProducts).post(createProduct)
router.route("/uploads").post(uploadProductImageLocal)



module.exports = router