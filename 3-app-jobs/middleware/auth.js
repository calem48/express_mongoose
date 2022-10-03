
const jwt = require('jsonwebtoken')
const { unAuthenticated } = require('../errors')
const User = require('../models/userModel')
const auth = async (req, res, next) => {
    const auth = req.headers.authorization

    if (!auth || !auth.startsWith('Bearer ')) {
        throw new unAuthenticated('invalid authenticated')
    }

    const token = auth.split(' ')[1]

    try {
        const decode = jwt.verify(token, process.env.JWT_TOKEN)
        console.log(decode);
        req.user = await User.findById({ _id: decode._id }).select('-password')

        next()
    } catch (error) {
        throw new unAuthenticated('invalid authenticated')
    }
}

module.exports = auth