const CustomError = require("./customerror")
const { StatusCodes } = require("http-status-codes")
class BadRequest extends CustomError {
    constructor(msg) {
        super(msg);
        this.status = StatusCodes.BAD_REQUEST;
    }
}

module.exports = BadRequest