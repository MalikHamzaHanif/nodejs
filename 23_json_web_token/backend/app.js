const express = require("express");
const app = express();
const router = require("./router/router");
const errorHandlerMiddleware = require("./middleware/errorHandlerMiddleware");
const routeNotFound = require("./middleware/routeNotFound");
require("dotenv").config();
// require("async-error-handler");
app.use(express.static("../frontend"))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1/user", router);
app.use(errorHandlerMiddleware)
app.use(routeNotFound)
function start() {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`server is listening at port ${process.env.PORT || 3000}`);

    })
}

start();
