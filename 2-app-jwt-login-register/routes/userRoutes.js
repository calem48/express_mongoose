
const express = require("express")
const { dashboard, login } = require("../controller/userController")
const authenticationMiddleware = require("../middleware/auth")
const router = express.Router()



router.route('/dashboard').get(authenticationMiddleware, dashboard)
router.route('/login').post(login)


module.exports = router