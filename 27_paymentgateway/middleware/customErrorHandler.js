const CustomError = require("../error/customerror")

function CustomErrorHandler (err,req,res,next){

    if(err instanceof CustomError){
        return res.status(err.status).json({sucess:false,message:err.message,data:{}})
    }
    
    return res.status(500).json({sucess:false,message:err,data:{}})
}
module.exports=CustomErrorHandler