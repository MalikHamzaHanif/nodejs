const mongo = require("mongoose")

const productSchema = new mongo.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    featured: {
        type: Boolean,
        required: true
    },
    rating: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date().toISOString()
    },
    company: {
        type: String,
        enum: ["marcos", "ikea", "caressa", "liddy"]
    }
});


module.exports = mongo.model("productschema", productSchema);




