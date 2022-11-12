const express = require('express')
const router = express.Router()
const { createReview, getAllReview, getSingleReview, removeReview, updateReview } =
    require("../controllers/reviewController")
const { auth, authorizedPermission } = require('../middleware/auth')


router
    .route("/")
    .get(getAllReview)
    .post(auth, createReview)

router
    .route('/:id')
    .get(getSingleReview)
    .delete(auth, removeReview)
    .patch(auth, updateReview)


module.exports = router
