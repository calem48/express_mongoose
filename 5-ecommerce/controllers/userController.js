
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const { StatusCodes } = require("http-status-codes")
const { BadRequestError, UnAuthenticatedError } = require('../errors')
const login = async (req, res) => {
    const { password, email } = req.body
    const user = await User.findOne({ email })

    if (!user) {
        throw new BadRequestError('check your email or password')
    }

    const comparePassword = await user.comparePassword(password)

    if (!comparePassword) {
        throw new UnAuthenticatedError('check your email or password')
    }

    const token = user.createTokenJWT()

    res.status(StatusCodes.OK).json({ msg: 'login success', username: user.name, token })
}



const register = async (req, res) => {
    const user = await User.create({ ...req.body })
    const token = user.createTokenJWT()
    res.status(StatusCodes.CREATED).json({ msg: 'login success', user, token })
}


const dash = async (req, res) => {
    res.status(200).json("hello in dashborad")
}

module.exports = { register, login, dash }

