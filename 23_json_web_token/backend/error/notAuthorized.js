const CustomError = require("./customError");
const http_error=require("http-status-codes")
class NotAuthorized extends CustomError {
    constructor(message){
        super(message);
        this.status=http_error.StatusCodes.UNAUTHORIZED
    }
}

module.exports=NotAuthorized