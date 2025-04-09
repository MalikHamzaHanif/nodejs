const express = require("express");
const authMidlleware = require("../middleware/authmiddleware");
const { registerUser, loginUser, getUserData } = require("../controller/usercontroller")
const router = express.Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/").get(authMidlleware, getUserData);
module.exports = router