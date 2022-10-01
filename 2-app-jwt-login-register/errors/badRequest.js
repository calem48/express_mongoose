
const { StatusCodes } = require('http-status-codes')
const CustomAPIerror = require('./customError')

class BadRequest extends CustomAPIerror {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

module.exports = BadRequest