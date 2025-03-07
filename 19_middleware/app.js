const express = require("express")
const authenticateUser=require("./authmiddleware");
const app = express();

function logRequestInformation(req,res){
  console.log(req.method,new Date().getFullYear(),req.url);

  
}

app.get("/", [logRequestInformation,authenticateUser],(req, res) => {
    // logRequestInformation(req,res)

    res.status(200).send("home")
    
})

app.get("/about", [logRequestInformation,authenticateUser],(req, res) => {
    
    // logRequestInformation(req,res)
    res.status(200).send("about")

})


// app.get("/", authenticateUser,(req, res) => {
//     // logRequestInformation(req,res)

//     res.status(200).send("home")
    
// })

// app.get("/about", authenticateUser,(req, res) => {
    
//     // logRequestInformation(req,res)
//     res.status(200).send("about")

// })

app.listen(5000, () => {
    console.log("server is listening at port 5000...");

})