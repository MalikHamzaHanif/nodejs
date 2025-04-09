const { NOT_FOUND, UNAUTHORIZED, BAD_REQUEST, INTERNAL_SERVER_ERROR } = require("../error/error")
const asyncWrapper = require("../middleware/asyncwrapper")
const userSchema = require("../model/usermodel");
const { StatusCodes } = require("http-status-codes")
const registerUser = asyncWrapper(async (req, res) => {
    const { email, name, password } = req.body

    if (!name || !email || !password) {
        throw new BAD_REQUEST("Name,email or password is missing.")
    }

    const userExist = await userSchema.findOne({ email });
    if (userExist) {
        throw new BAD_REQUEST("User already exist please login.")
    }

    const user = await userSchema.create({ ...req.body });

    if (user) {
        return res.status(StatusCodes.OK).json({
            success: true, data: {
                msg: "User created successfully. Please login!"
            }
        })
    } else {
        throw new INTERNAL_SERVER_ERROR("Something went wrong while creating user. Please try again later.")
    }

})

const loginUser = asyncWrapper(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new BAD_REQUEST("Name,email or password is missing.")
    }

    const user = await userSchema.findOne({ email });
    if (!user) {
        throw new BAD_REQUEST("User doesnot exists.")
    }

    const verifyUser = await user.comparePassword(password);

    if (!verifyUser) {
        throw new UNAUTHORIZED("Invailed credentials.")
    }
    const token = user.generateToken();

    return res.status(StatusCodes.OK).json({
        success: true, data: {
            msg: "Login request successfull!",
            data: {
                name: user.name,
                email: user.email,
                userId:user._id,
                token: token
            }
        }
    })


})


const getUserData = asyncWrapper(async (req, res) => {
    const { userId } = req.user

    if (!userId) {
        throw new BAD_REQUEST("Something went wrong with the token.")
    }

    const user = await userSchema.findOne({ _id: userId });
    if (!user) {
        throw new BAD_REQUEST("User doesnot exist.")
    }

    return res.status(StatusCodes.OK).json({
        success: true, data: {
            msg: "user data request successfull!",
            data: {
                userId: user._id,
                email: user.email,
                name: user.name,
            }
        }
    })

})

module.exports = { registerUser, loginUser, getUserData }