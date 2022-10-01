const { StatusCodes } = require('http-status-codes')
const CustomAPIerror = require('./customError')

class unAuthenticated extends CustomAPIerror {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = unAuthenticated