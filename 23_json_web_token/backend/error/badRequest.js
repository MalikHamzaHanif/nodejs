const CustomError = require("./customError");
const http_error=require("http-status-codes")
class BadRequest extends CustomError {
    constructor(message){
        super(message);
        this.status=http_error.StatusCodes.BAD_REQUEST
    }
}

module.exports=BadRequest