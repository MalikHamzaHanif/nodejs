const CustomError=require("./customerror");
const UNAUTHORIZED=require('./customerror');
const BAD_REQUEST=require("./badrequest");
const INTERNAL_SERVER_ERROR=require("./internal");
const NOT_FOUND=require("./notfound")

module.exports={CustomError,UNAUTHORIZED,BAD_REQUEST,INTERNAL_SERVER_ERROR,NOT_FOUND}