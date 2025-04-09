const { BAD_REQUEST, UNAUTHORIZED } = require('../error/error');
const jwt = require("jsonwebtoken");
function authMidlleware(req, res, next) {
    const authToken = req.headers.authorization


    if (!authToken) {
        throw new BAD_REQUEST("No token found.")
    }

    if (!authToken.startsWith("Bearer ")) {
        throw new BAD_REQUEST("Invailed token.")
    }
    const token = authToken.split(" ")[1]
    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        req.user = {
            userId: payload.userId,
            email: payload.email
        }
        next();
    } catch (err) {
        throw new UNAUTHORIZED("You are not authorized to access this resource.")
    }
}

module.exports = authMidlleware