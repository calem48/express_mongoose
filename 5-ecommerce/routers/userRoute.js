
const { login, register, dash } = require("../controllers/userController")
const router = express.Router()


router.route('/login').post(login)
router.route('/register').post(register)
router.route('/dash').get(dash)

module.exports = router