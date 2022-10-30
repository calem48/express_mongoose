const { UnAuthenticatedError, authorizedPermisson } = require("../errors")
const { isValidToken } = require("../utils")


const auth = async (req, res, next) => {
    const token = req.signedCookies.token

    if (!token) {
        throw new UnAuthenticatedError('authenticated invalid')
    }

    try {
        const payload = isValidToken(token)
        req.user = { ...payload }
        next()
    } catch (error) {
        throw new UnAuthenticatedError('authenticated invalid')
    }
}

const authorizedPermission = (...roles) => {
    return (req, res, next,) => {
        if (!roles.includes(req.user.role)) {
            throw new authorizedPermisson("unauthorzed to access this route")
        }
        next()
    }
}

module.exports = { auth, authorizedPermission }


