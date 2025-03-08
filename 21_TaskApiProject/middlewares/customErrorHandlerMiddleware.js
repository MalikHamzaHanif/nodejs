const { CustomError } = require("./customError");

function customErrorHandlerMiddleware(err, req, res, next) {
    if(err instanceof CustomError){

        return res.status(err.status).json(`Error: ${err.message}`);
    }
    next(err);
}

module.exports = customErrorHandlerMiddleware