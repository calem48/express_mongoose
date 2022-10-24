const { UnAuthenticatedError, authorizedPermisson } = require("../errors")
const { isValidToken } = require("../utils")


const auth = async (req, res, next) => {
    const token = req.signedCookies.token

    if (!token) {
        throw new UnAuthenticatedError('authenticated invalid')
    }

    try {
        const payload = isValidToken(token)
        console.log(payload);
        req.user = { ...payload }
        next()
    } catch (error) {
        throw new UnAuthenticatedError('authenticated invalid')
    }
}

const authorizedPermission = (req, res, next,) => {

    if (req.user.role !== "admin") {
        throw new authorizedPermisson("you don't have a permisson")
    }
    next()

}

module.exports = { auth, authorizedPermission }


