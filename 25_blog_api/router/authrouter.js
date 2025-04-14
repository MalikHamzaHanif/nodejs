const express = require("express");
const authMidlleware = require("../middleware/authmiddleware");
const { registerUser, loginUser, getUserData, updateUser } = require("../controller/usercontroller");
const testUserMiddleware = require("../middleware/testusermiddleware");
const router = express.Router();
const {rateLimit}=require("express-rate-limit")

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	limit: 20, 
	standardHeaders: 'draft-8',
	legacyHeaders: false,
    message: { error: 'Too many requests, please try again later.' },
})


router.route("/register").post(limiter,registerUser);
router.route("/login").post(limiter,loginUser);
router.route("/").get(authMidlleware, getUserData).patch(authMidlleware,testUserMiddleware,updateUser);
module.exports = router