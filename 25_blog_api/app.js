const connectDatabase = require("./db/db");
require("dotenv").config();
const path=require("path")
const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
const cors=require("cors");
const blogRouter = require("./router/blogrouter")
const authRouter = require("./router/authrouter")
const routeNotFound = require("./middleware/routenotfound");
const customErrorMiddleware = require("./middleware/customerrormiddleware");
const authMidlleware = require("./middleware/authmiddleware");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static("./public/dist"));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/blog", authMidlleware, blogRouter);
app.get(/(.*)/,(req,res)=>{

// /(.*)/ was recommended since 5.0.0-beta.1, but won't work any more in 5.0.0    
    res.sendFile(path.resolve(__dirname,"public","dist","index.html"))
})

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