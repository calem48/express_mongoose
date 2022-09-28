
class CustomAPIErrors extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}

const createCustomError = (message, statusCode) => {
    return new CustomAPIErrors(message, statusCode)
}

module.exports = { createCustomError, CustomAPIErrors }