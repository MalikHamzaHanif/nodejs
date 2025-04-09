const CustomError = require("./customerror");
const {StatusCodes}=require("http-status-codes")
class UnAuthorized extends CustomError{
  constructor(msg){
    super(msg);
    this.status=StatusCodes.UNAUTHORIZED
  }
}

module.exports=UnAuthorized