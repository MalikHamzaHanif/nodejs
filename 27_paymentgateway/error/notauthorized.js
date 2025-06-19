const CustomError = require("./customerror")
const { StatusCodes } = require("http-status-codes")
class Unauthorized extends CustomError {
    constructor(msg) {
        super(msg);
        this.status = StatusCodes.UNAUTHORIZED;
    }
}

module.exports = Unauthorized