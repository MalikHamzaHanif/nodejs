const express = require("express");
const routeNotFoundMiddleware = require("./middlewares/routeNotFoundMiddleware");
const connectDatabase = require("./db/connectdb");
const router=require("./router/router");
const customErrorHandlerMiddleware = require("./middlewares/customErrorHandlerMiddleware");
require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1/task", router)
app.use(routeNotFoundMiddleware);
app.use(customErrorHandlerMiddleware)


async function start() {
    try {
        const db=   await connectDatabase(process.env.MONGO_URI)
        console.log(db.connection.name);
        console.log(db.connection.host);
        
        app.listen(PORT, () => {
            console.log(`Server is listening at port ${PORT}`);

        })
    } catch (e) {
        console.log(e);

    }
}

start()