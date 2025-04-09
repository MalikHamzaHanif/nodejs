const mongo = require("mongoose");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const user = new mongo.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email'],
    },
    password: {
        type: String,
        required: true,
    },

}, { timestamps: true });


user.pre("save", async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

user.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password)
}

user.methods.generateToken =  function () {
    return jwt.sign({ email: this.email, userId: this._id }, process.env.SECRET_KEY, { expiresIn: "2d" });

}
module.exports = mongo.model("user", user);