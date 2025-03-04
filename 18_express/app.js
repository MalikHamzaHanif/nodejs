const express = require('express')
const app = express()

app.get("/",(req,res)=>{
    res.status(200).send("<h1>Home Page</h1>")

})
app.get("/about",(req,res)=>{
    res.status(200).send("<h1>About</h1>")

})
app.get("/contact",(req,res)=>{
    res.status(200).send("<h1>Contact</h1>")

})
app.all("*",(req,res)=>{
    res.status(404).send("<h1>Not Found !</h1>")
})

app.listen(5000, () => console.log("server is listening at port 5000...")
)

//methods
//get
//post
//update
//delete
//use
//all