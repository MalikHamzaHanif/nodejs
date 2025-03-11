const { CustomError } = require("../error/index");

function errorHandlerMiddleware(err, req, res, next) {

    if (err instanceof CustomError) {
        return res.status(err.status).send(err.message)
    }

    next(err);
}


module.exports = errorHandlerMiddleware;