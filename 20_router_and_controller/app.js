
const express = require("express");
const app = express()
const router=require("./router/router");
app.use(express.static("./public"))
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use("/api/v1/user",router)
app.listen(5000, () => {
    console.log("server is listening at port 5000...");

})
