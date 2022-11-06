
const User = require('../models/userModel')
const { StatusCodes } = require("http-status-codes")
const customError = require('../errors')
const { sendCookies, checkPermission } = require('../utils')


const getAllUsers = async (req, res) => {
    const user = await User.find({ role: "user" }).select('-password')
    res.status(StatusCodes.OK).json({ user })
}

const getSingleUsers = async (req, res) => {
    const user = await User.findOne({ _id: req.params.id }).select('-password')

    if (!user) {
        throw new customError.NotFoundError("user not found")
    }
    checkPermission(req.user, user._id)
    res.status(StatusCodes.OK).json({ user })
}

const updateUser = async (req, res) => {

    const { name, email } = req.body
    if (!name || !email) {
        throw new customError.BadRequestError("put name and password")
    }
    // const user = await User.findByIdAndUpdate({ _id: req.user.userId }, { name, email }, { new: true, runValidators: true })
    const user = await User.findById({ _id: req.user.userId })
    user.name = name
    user.email = email
    await user.save()
    const payload = { userId: user._id, user: user.name, role: user.role }
    sendCookies(res, payload)
    res.status(StatusCodes.OK).json({ msg: "update user", payload })
}

const removeUser = async (req, res) => {
    res.status(StatusCodes.OK).json("remove user")
}

const updatePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body

    if (!oldPassword || !newPassword) {
        throw new customError.BadRequestError('please put values')
    }

    const user = await User.findById({ _id: req.user.userId })
    const checkPassword = await user.comparePassword(oldPassword)

    if (!checkPassword) {
        throw new customError.UnAuthenticatedError('invalid password')
    }

    user.password = newPassword
    await user.save()
    res.status(StatusCodes.OK).json({ msg: "password updated successfully" })
}

module.exports = { getAllUsers, getAllUsers, updateUser, updatePassword, removeUser, getSingleUsers }