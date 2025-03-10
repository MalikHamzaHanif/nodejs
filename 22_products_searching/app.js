const express = require('express')
const app = express();
require("dotenv").config()
const connectDATABASE = require("./db/db");
const router = require("./router/router");
const customErrorHandler = require('./middleware/custom_error_handler_middleware');
const routeNotFound = require('./middleware/route_not_found_middleware');
const PORT = process.env.PORT || 3000;
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1/product", router);
app.use(customErrorHandler)
app.use(routeNotFound)
async function start() {
    try {
        const dbConnection = await connectDATABASE(process.env.MONGO_URI);
        console.log(dbConnection.connection.name);
        console.log(dbConnection.connection.host);
        app.listen(PORT, () => {
            console.log(`Server is listening at port ${PORT}`);

        })

    } catch (e) {
        console.log(e);
    }
}

start();