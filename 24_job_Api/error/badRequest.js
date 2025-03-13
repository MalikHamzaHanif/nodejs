const CustomError = require("./customError");
const httpStatusCodes = require("http-status-codes")
class BadRequest extends CustomError {
    constructor(message) {
        super(message),
            this.status = httpStatusCodes.StatusCodes.BAD_REQUEST
    }
}

module.exports = BadRequest