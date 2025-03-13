const CustomError = require("../error/customError");

function CustomErrorHandlerMiddleware(err, req, res, next) {
    

    if (err instanceof CustomError) {
 

        return res.status(err.status).json(err.message)
    }
    next(err);
}

module.exports = CustomErrorHandlerMiddleware;