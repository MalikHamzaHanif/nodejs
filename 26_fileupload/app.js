const connectDatabase = require("./db/db");
require("dotenv").config();
const path=require("path")
const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
const routeNotFound = require("./middleware/routenotfound");
const customErrorMiddleware = require("./middleware/customerrormiddleware");
const productRouter = require("./router/productRouter");
const fileUpload = require("express-fileupload");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload({useTempFiles:true}))
app.use(express.static("./public"));
app.use("/api/v1/product", productRouter);

app.use(routeNotFound);
app.use(customErrorMiddleware);
async function start() {
    try {
        const db = await connectDatabase(process.env.MONGO_URI);
        console.log(db.connection.name);
        console.log(db.connection.host);
        app.listen(PORT, () => {
            console.log(`Server is listening at ${PORT} ...`);
        });
    } catch (error) {
        console.log(error);

    }
}

start();