const mongo=require("mongoose");
function connectDATABASE(url){
    return mongo.connect(url); 
}

module.exports=connectDATABASE;