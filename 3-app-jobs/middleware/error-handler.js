const CustomAPIerror = require("../errors/custom-error")
const { StatusCodes } = require('http-status-codes')

const middlewareErrorsHandler = (err, req, res, next) => {

    const customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || "there is somthing happened try later"
    }

    //this error when you let monogo db validate the inputs like here register i didn't validate any input from user directly i use it in query monogo
    if (err.name === "ValidationError") {
        customError.message = Object.values(err.errors).map(item => item.message).join(',')
        customError.statusCode = StatusCodes.BAD_REQUEST
    }

    if (err.code === 11000) {
        customError.message = `Duplicated ${Object.keys(err.keyValue)} please try an other one`
        customError.statusCode = StatusCodes.BAD_REQUEST
    }

    // return res.status(customError.statusCode).json({ err })

    return res.status(customError.statusCode).json({ msg: customError.message })

}

module.exports = middlewareErrorsHandler