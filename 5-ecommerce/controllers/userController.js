
const User = require('../models/userModel')
const { StatusCodes } = require("http-status-codes")
const customError = require('../errors')


const getAllUsers = async (req, res) => {
    const user = await User.find({ role: "user" }).select('-password')
    res.status(StatusCodes.OK).json({ user })
}

const getSingleUsers = async (req, res) => {
    const user = await User.findOne({ _id: req.params.id }).select('-password')

    if (!user) {
        throw new customError.NotFoundError("user not found")
    }
    res.status(StatusCodes.OK).json({ user })
}

const updateUser = async (req, res) => {
    res.status(StatusCodes.OK).json("update user")
}

const removeUser = async (req, res) => {
    res.status(StatusCodes.OK).json("remove user")
}

const updatePassword = async (req, res) => {
    res.status(StatusCodes.OK).json("update user")
}

module.exports = { getAllUsers, getAllUsers, updateUser, updatePassword, removeUser, getSingleUsers }