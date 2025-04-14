const CustomError = require("./customerror");
const {StatusCodes}=require("http-status-codes")
class InternalServerError extends CustomError{
  constructor(msg){
    super(msg);
    this.status=StatusCodes.INTERNAL_SERVER_ERROR
  }
}

module.exports=InternalServerError