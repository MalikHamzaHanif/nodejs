const mongo = require("mongoose");

const task = new mongo.Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, "Length of the name must be > 3"],
        maxlength: 20,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});
module.exports = mongo.model("task", task);