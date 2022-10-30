
const User = require('../models/userModel')
const { StatusCodes } = require("http-status-codes")
const { BadRequestError, UnAuthenticatedError } = require('../errors')
const { sendCookies } = require('../utils')

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
    sendCookies(res, payload)
    res.status(StatusCodes.OK).json({ msg: 'login success', user: payload })
}



const register = async (req, res) => {
    const { name, password, email } = req.body

    const user = await User.create({ name, password, email })

    const payload = { userId: user._id, user: user.name, role: user.role }
    sendCookies(res, payload)
    res.status(StatusCodes.OK).json({ msg: 'login success', user: payload })
}


const logout = async (req, res) => {
    res.cookie("token", "logout", { expires: new Date(Date.now()) })
    res.status(StatusCodes.OK).json({ msg: "logout success" })
}

module.exports = { register, login, logout }

