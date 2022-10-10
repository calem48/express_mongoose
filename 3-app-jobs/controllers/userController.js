
const User = require('../models/userModel')
const { StatusCodes } = require('http-status-codes')
const { unAuthenticated, BadRequestError } = require('../errors')

const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new BadRequestError("email and password require")
    }

    const user = await User.findOne({ email })

    if (!user) {
        throw new unAuthenticated('check your email or password')
    }
    const decodePassword = await user.comparePassword(password)

    if (!decodePassword) {
        throw new unAuthenticated('check your email or password')
    }

    const token = await user.createTokenJwt()
    res.status(StatusCodes.OK).json({ msg: 'login seccessfully', username: user.name, token })
}

const register = async (req, res) => {
    const user = await User.create({ ...req.body })

    const token = await user.createTokenJwt()

    res.status(StatusCodes.CREATED).json({ user, token })
}

module.exports = { login, register }
