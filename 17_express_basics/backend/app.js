const express = require('express')
const app = express()

app.use(express.static("../public"))
app.all("*",(req,res)=>{
    res.status(404).send("<h1>Not Found !</h1>")
})

app.listen(5000, () => console.log("server is listening at port 5000...")
)