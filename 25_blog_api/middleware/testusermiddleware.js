const { BAD_REQUEST } = require("../error/error")

function testUserMiddleware(req,res,next){

    if(req.user.testUser){
        throw new BAD_REQUEST("Test user.Read only!")
    }
    next();


}

module.exports=testUserMiddleware