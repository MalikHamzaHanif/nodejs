const { BAD_REQUEST, NOT_FOUND, UNAUTHORIZED } = require("../error/error");
const user = require("../model/userModel");
const asyncWrapper = require("../middleware/asyncWrapperMiddleware");
const { StatusCodes } = require("http-status-codes");

const registerUser = asyncWrapper(async (req, res) => {

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw new BAD_REQUEST("Name , email or password missing");
    }
    const newUser = await user.create({ ...req.body });
    res.status(StatusCodes.OK).json({ msg: "user created Successfully. Please login", user: newUser });
})

const loginUser = asyncWrapper(async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        throw new BAD_REQUEST("Email or Password missing");
    }

    const newUser = await user.findOne({ email });
    if (!newUser) {
        throw new NOT_FOUND("No user with these credentials")
    }


    const isPasswordCorrect = await newUser.verifyPassword(password);

    if (!isPasswordCorrect) {
        throw new UNAUTHORIZED("Password and email doesnot match")
    }
    const token = newUser.generateToken();
    console.log(token);

    res.status(StatusCodes.OK).json({
        token,
        email: newUser.email,
        id: newUser._id,
    });
})

module.exports = { registerUser, loginUser }