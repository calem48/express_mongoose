
const express = require('express')
const { getAllUsers, getSingleUsers, updateUser, removeUser, updatePassword } = require('../controllers/userController')
const { auth, authorizedPermission } = require('../middleware/auth')
const router = express.Router()


router.route('/').get(auth, authorizedPermission, getAllUsers)
router.route('/:id').get(auth, getSingleUsers)
router.route('/updateUser').patch(updateUser)
router.route('/removeUser').patch(removeUser)
router.route('/updatePassword').patch(updatePassword)

module.exports = router