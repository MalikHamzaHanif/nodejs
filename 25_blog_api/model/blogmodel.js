const mongo = require("mongoose");

const blog = new mongo.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 500
    },
    category: {
        type: String,
        required: true,
        enum: ["technology", "fashion", "politics", "other"]
    },
    createdBy: {
        type: mongo.Types.ObjectId,
        ref: "user",
        required: true,
    }
}, { timestamps: true });

module.exports = mongo.model("blog", blog);