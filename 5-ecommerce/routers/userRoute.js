
const express = require('express')
const { getAllUsers, getSingleUsers, updateUser, removeUser, updatePassword, setCurrentUser } = require('../controllers/userController')
const { auth, authorizedPermission } = require('../middleware/auth')
const router = express.Router()


router.route('/').get(auth, authorizedPermission('admin'), getAllUsers)
router.route('/me').get(auth, setCurrentUser)
router.route('/:id').get(auth, getSingleUsers)
router.route('/updateUser').patch(auth, updateUser)
router.route('/removeUser').patch(auth, removeUser)
router.route('/updatePassword').patch(auth, updatePassword)

module.exports = router