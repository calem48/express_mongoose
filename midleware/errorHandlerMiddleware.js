const { CustomAPIErrors } = require("../errors/error")


const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomAPIErrors) {
        return res.status(err.statusCode).json({ msg: err.message })
    }
    return res.status(500).json({ msg: "please try it again later" })
}


module.exports = errorHandlerMiddleware