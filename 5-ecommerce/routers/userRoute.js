const express = require("express")
const { login, register, dash } = require("../controllers/userController")
const auth = require("../middleware/auth")
const router = express.Router()


router.route('/login').post(login)
router.route('/register').post(register)
router.route('/dash').get(auth, dash)

module.exports = router