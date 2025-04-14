const mongo = require("mongoose");

const product = new mongo.Schema({
    name: {
        type: String,
        required: true,
    },
    imageurl: {
        type: String,
        required: true,
    },
    publicid:{
        type:String,
        required:true
    }
   
}, { timestamps: true });

module.exports = mongo.model("product", product);