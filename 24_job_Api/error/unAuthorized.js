const CustomError = require("./customError");
const httpStatusCodes = require("http-status-codes")
class UnAuthorized extends CustomError {
    constructor(message) {
        super(message),
            this.status = httpStatusCodes.StatusCodes.UNAUTHORIZED
    }
}

module.exports = UnAuthorized