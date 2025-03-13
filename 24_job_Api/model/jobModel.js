const mongo = require("mongoose")
const job = new mongo.Schema({
    name: {
        type: String,
        maxlength: 20,
        minlength: 3,
        required: [true, "Job name can not be empty !"],
    },
    company: {
        type: String,

        required: [true, "Company name can not be empty !"],
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending"
    },
    createdBy: {
        type: mongo.Types.ObjectId,
        ref: "user",
        required: true

    }
}, { timestamps: true });
module.exports = mongo.model("job", job)