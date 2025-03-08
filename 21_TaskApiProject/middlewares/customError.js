class CustomError extends Error{
    constructor(status,message){
        super(message);
        this.status=status
    }
}

function customErrorHandler(status,message){
    return new CustomError(status,message);
}

module.exports={CustomError,customErrorHandler};