const { UnAuthenticatedError } = require("../errors")
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    const auth = req.headers.authorization

    if (!auth || !auth.startsWith('Bearer')) {
        throw new UnAuthenticatedError('you did not authenticated')
    }

    const token = auth.split(" ")[1]

    try {
        const decode = jwt.verify(token, process.env.JWT_TOKEN)
        req.userId = decode._id
        next()
    } catch (error) {
        throw new UnAuthenticatedError('you did not authenticated')
    }



}

module.exports = auth