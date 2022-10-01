const { CustomAPIerror } = require("../errors")
const { StatusCodes } = require('http-status-codes')


const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomAPIerror) {
        return res.status(err.statusCode).json({ msg: err.message })
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("try it later")
}

module.exports = errorHandlerMiddleware