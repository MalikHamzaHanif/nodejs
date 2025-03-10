function routeNotFound(req,res){
    res.status(500).json("Route not found");
}

module.exports=routeNotFound;