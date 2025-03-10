class CustomError extends Error{
    constructor(status,message){
        super(message);
        this.status=status;
    }
}

function useCustomError(status,message){
    return new CustomError(status,message);
}

module.exports={CustomError,useCustomError};