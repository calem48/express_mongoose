const BadRequestError = require("./badRequestError");
const CustomError = require("./customError");
const NotFoundError = require("./notFoundError");
const UnAuthenticatedError = require("./UnAuthenticatedError");
const authorizedPermisson = require("./unauthorized");


module.exports = { CustomError, BadRequestError, NotFoundError, UnAuthenticatedError, authorizedPermisson }