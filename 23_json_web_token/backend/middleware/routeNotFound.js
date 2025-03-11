function routeNotFound(req,res){
    res.status(404).json("Route Not Found !")
}

module.exports=routeNotFound