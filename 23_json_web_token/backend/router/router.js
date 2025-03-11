const express = require('express');
const router = express.Router();
const { getUserData, loginUser } = require('../controller/controller');
const AuthorizationMiddleware = require('../middleware/authorization');
router.route("/login").post(loginUser);
router.route("/dashboard").get(AuthorizationMiddleware,getUserData);

module.exports = router;