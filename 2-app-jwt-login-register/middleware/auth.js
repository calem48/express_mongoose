const { UnAuthenticated } = require("../errors")
const jwt = require('jsonwebtoken')
const authenticationMiddleware = (req, res, next) => {
    let authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnAuthenticated("no token")
    }

    let token = authHeader.split(' ')[1]
    try {
        let decoded = jwt.verify(token, process.env.JWT_TOKEN)
        req.username = decoded.username
        next()
    } catch (error) {
        throw new UnAuthenticated('not authorized')
    }


}

module.exports = authenticationMiddleware