function routeNotFoundMiddleware(req,res){
    res.status(500).json("Route not found");
}

module.exports=routeNotFoundMiddleware;