const { StatusCodes } = require('http-status-codes')

const middlewareErrorHandler = (err, req, res, next) => {

    const customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || `there something happened try later`
    }

    if (err.name === "ValidationError") {
        customError.statusCode = StatusCodes.BAD_REQUEST
        customError.message = `${Object.values(err.errors).map(item => item.message).join(',')}`
    }

    if (err.code === 11000) {
        customError.statusCode = StatusCodes.BAD_REQUEST
        customError.message = `duplicated ${Object.keys(err.keyValue)}  `
    }

    if (err.name === "CastError") {
        customError.statusCode = StatusCodes.NOT_FOUND
        customError.message = `not found this id : ${err.value} `
    }

    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
    return res.status(customError.statusCode).json({ msg: customError.message })

}

module.exports = middlewareErrorHandler