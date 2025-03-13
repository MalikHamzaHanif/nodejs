const { BAD_REQUEST } = require("../error/error");
const jwt = require("jsonwebtoken");
function Authenticate(req, res, next) {
    const authorization = req.headers.authorization;
    
    if (!authorization || !authorization.startsWith("Bearer ")) {
        throw new BAD_REQUEST("Something went wrong with the token !");
    }


    try {
        const token = authorization.split(" ")[1];
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        req.user = { userId: payload.id, email: payload.email, name: payload.name }
        next();
    } catch (e) {
        next(e);
    }
}

module.exports = Authenticate