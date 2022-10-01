const CustomAPIerror = require("../errors/custom-error")
const { StatusCodes } = require('http-status-codes')

const middlewareErrorsHandler = (err, req, res, next) => {

    if (err instanceof CustomAPIerror) {
        return res.status(err.statusCode).json({ msg: err.message })
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('there is something happened try later')

}

module.exports = middlewareErrorsHandler