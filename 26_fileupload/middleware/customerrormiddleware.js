const CustomError = require("../error/customerror")

function customErrorMiddleware(err, req, res, next) {
    if (err instanceof CustomError) {
        
        return res.status(err.status).json({ success: false, err: { msg: err.message } })
    }
    
    return res.status(err.status || 500).json({ success: false, err: { msg: err } })

}

module.exports = customErrorMiddleware