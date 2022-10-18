
const User = require('../models/userModel')
const { StatusCodes } = require("http-status-codes")
const { BadRequestError, UnAuthenticatedError } = require('../errors')
const { createJWT } = require('../utils')

const login = async (req, res) => {
    const { password, email } = req.body

    if (!password || !email) {
        throw new BadRequestError("please check email or password")
    }
    const user = await User.findOne({ email })

    if (!user) {
        throw new BadRequestError('check your email or password')
    }

    const comparePassword = await user.comparePassword(password)

    if (!comparePassword) {
        throw new UnAuthenticatedError('check your email or password')
    }
    const payload = { userId: user._id, user: user.name, role: user.role }
    const token = createJWT(payload)

    res.status(StatusCodes.OK).json({ msg: 'login success', user: payload, token })
}



const register = async (req, res) => {
    const { name, password, email } = req.body

    const user = await User.create({ name, password, email })
    const token = user.createTokenJWT()
    res.status(StatusCodes.CREATED).json({ msg: 'login success', user, token })
}


const logout = async (req, res) => {
    res.status(200).json("logout")
}

module.exports = { register, login, logout }

