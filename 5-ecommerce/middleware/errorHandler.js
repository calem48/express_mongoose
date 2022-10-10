const { StatusCodes } = require('http-status-codes')

const middlewareErrorHandler = (err, req, res, next) => {

    const customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || `there something happened try later`
    }


    return res.status(500).json({ err })
    return res.status(customError.statusCode).json({ msg: customError.message })

}

module.exports = middlewareErrorHandler