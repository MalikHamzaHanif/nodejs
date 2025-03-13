const express = require('express');
const app = express();
require("dotenv").config();

const { rateLimit } = require('express-rate-limit');
const helmet = require("helmet");
const cors = require("cors");
const databaseConnection = require("./db/db");
const jobRouter=require("./router/jobRouter");
const userRouter=require("./router/userRouter");
const authenticateRouteMiddleware=require("./middleware/authorizationMiddleware");
const customErrorMiddleware=require("./middleware/customErrorHandlerMiddleware");
const routeNotFound=require("./middleware/routeNotExists");
const PORT = process.env.PORT || 3000
const limit = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-8',
    legacyHeaders: false
});

app.set("trust proxy", 1);
app.use(cors());
app.use(helmet());
app.use(limit);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/v1/user",userRouter);
app.use("/api/v1/job",authenticateRouteMiddleware,jobRouter);


app.use(routeNotFound);
app.use(customErrorMiddleware);


async function start() {
    try {
        const db = await databaseConnection(process.env.MONGO_URI);
        console.log(db.connection.name);
        console.log(db.connection.host);
        app.listen(PORT, () => {
            console.log(`Server is listening at port: ${PORT}...`);

        })
    } catch (e) {
        console.log(e);

    }
}

start()
