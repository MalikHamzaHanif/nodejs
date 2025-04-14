const CustomError = require("./customerror");
const {StatusCodes}=require("http-status-codes")
class NotFound extends CustomError{
  constructor(msg){
    super(msg);
    this.status=StatusCodes.NOT_FOUND
  }
}

module.exports=NotFound