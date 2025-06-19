require("dotenv").config()
const express = require("express");
const app = express();
const router = require("./router/router");
const CustomErrorHandler = require("./middleware/customErrorHandler");
const routeNotFound = require("./middleware/routeNotFound");
const multer=require("multer")()

app.use(multer.none())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static("./public"))

app.use("/api/v1/user", router)
app.use(routeNotFound)
app.use(CustomErrorHandler)
app.listen(5000, () => {
    console.log("server is listening at port 5000...");
})

