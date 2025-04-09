const mongo=require("mongoose");

function connectDatabase(url){
    return mongo.connect(url);
}

module.exports=connectDatabase;