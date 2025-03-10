require("dotenv").config();
const express = require('express')
const app = express();
const connectDATABASE = require("./db/db");
const products=require("./products.json");
const products_schema = require('./model/products_schema');
const PORT = process.env.PORT || 3000;
console.log(process.env.PORT);

async function start() {
    try {
        const dbConnection = await connectDATABASE(process.env.MONGO_URI);
        console.log(dbConnection.connection.name);
        console.log(dbConnection.connection.host);
        await products_schema.deleteMany({})
        await products_schema.create(products)
        app.listen(PORT, () => {
            console.log(`Server is listening at port ${PORT}`);
        });

    } catch (e) {
        console.log(e);
    }
}

start();