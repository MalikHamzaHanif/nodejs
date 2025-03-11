const jwt = require('jsonwebtoken');
const { UnAuthorized } = require('../error');
function AuthorizationMiddleware(req, res, next) {
    

    const authorization = req.headers.authorization
 
    
    if (authorization) {
        const token = authorization.split(" ")[1]
        try {
            const payload = jwt.verify(token, process.env.SECRET_KEY);
            req.user = payload
            next();
        } catch (e) {
            throw new UnAuthorized("Unauthorized Request");
        }
    } else {
        throw new UnAuthorized("Unauthorized Request");

    }


}

module.exports = AuthorizationMiddleware