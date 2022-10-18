
const jwt = require('jsonwebtoken')

const createJWT = (pyload) => {
    return jwt.sign(pyload, process.env.JWT_TOKEN, { expiresIn: process.env.LIFETIME })
}

const isValidToken = (token) => {
    return jwt.verify(token, process.env.JWT_TOKEN)
}


module.exports = { createJWT, isValidToken }