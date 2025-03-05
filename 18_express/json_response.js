const express = require("express");
const app = express()

app.get("/", (req, res) => {
    res.send("<h1><a href='/api/v1/user'>go to users</a></h1>")
})
app.get("/api/v1/user", (req, res) => {
    res.status(200).json([
        {
            name: "hamza",

            age: 24
        },
        {
            name: "ali",

            age: 33
        },
        {
            name: "shahid",

            age: 45
        },
        {
            name: "Usman",

            age: 89
        },
    ])
});
app.all("*", (req, res) => {
    res.status(404).send("<h1>Nothing found here</h1>")
})
app.listen(5000, () => {
    console.log("server is listening at port 5000.");

})