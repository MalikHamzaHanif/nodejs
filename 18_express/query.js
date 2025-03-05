const express = require("express");
const app = express()
const { users } = require('./users')
app.get("/", (req, res) => {
    res.send("<h1><a href='/api/v1/user'>go to users</a></h1>")
})



app.get("/api/v1/user", (req, res) => {
    const userId = req.params.userId
    const {username,limit}=req.query
    let myUsers=[...users]
    
    if(username){
        myUsers=myUsers.filter((u)=>u.name.startsWith(username[0].toUpperCase()+username.substring(1)))
    }
    if(limit){
        myUsers=myUsers.slice(0,limit);
        
    }
    
    console.log(myUsers);
    if (myUsers.length>0) {
        res.status(200).json({ ...myUsers })

    } else {
        res.status(404).json("not found")
    }
})

app.all("*", (req, res) => {
    res.status(404).send("<h1>Nothing found here</h1>")
})
app.listen(5000, () => {
    console.log("server is listening at port 5000.");

})