
const jwt = require('jsonwebtoken')

const createJWT = (pyload) => {
    return jwt.sign(pyload, process.env.JWT_TOKEN, { expiresIn: process.env.LIFETIME })
}

const isValidToken = (token) => {
    return jwt.verify(token, process.env.JWT_TOKEN)
}

const sendCookies = (res, payload) => {
    const token = createJWT(payload)

    res.cookie("token", token, {
        sameSite: "none",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1),
        httpOnly: true,
        secure: true,
        // signed: true
    })

    // res.status(200).json({ msg: 'login success', user: payload })
}


module.exports = { sendCookies, isValidToken }

