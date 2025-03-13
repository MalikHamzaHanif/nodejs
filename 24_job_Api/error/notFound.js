const CustomError = require("./customError");
const httpStatusCodes = require("http-status-codes")
class NotFound extends CustomError {
    constructor(message) {
        super(message),
        this.status = httpStatusCodes.StatusCodes.NOT_FOUND
    }
}

module.exports = NotFound