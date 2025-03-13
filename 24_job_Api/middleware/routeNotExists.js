const httpStatusCodes=require("http-status-codes")
function routeNotFound(req,res){
    res.status(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR).send("Route doesnot exists!.")
}

module.exports=routeNotFound