const mongo = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = new mongo.Schema({
    name: {
        type: String,
        maxlength: 20,
        minlength: 3,
        required: [true, "Job name can not be empty !"],
    },
    email: {
        type: String,
        required: [true, "email name can not be empty !"],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email'],
    },
    password: {
        type: String,
        required: true
    },

}, { timestamps: true });

user.pre("save", async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt);
})

user.methods.generateToken = function () {
    const token = jwt.sign({ id: this._id, email: this.email, name: this.name },process.env.SECRET_KEY,{expiresIn:process.env.SECRET_LIFETIME});
    return token;
}
user.methods.verifyPassword = async function (clientPassword) {

    const isPasswordCorrect = await bcrypt.compare(clientPassword, this.password);

    return isPasswordCorrect;
}
module.exports = mongo.model("user", user)