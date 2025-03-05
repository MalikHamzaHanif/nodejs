const express = require("express");
const app = express()
const { users } = require('./users')
app.get("/", (req, res) => {
    res.send("<h1><a href='/api/v1/user'>go to users</a></h1>")
})
app.get("/api/v1/user", (req, res) => {
    res.status(200).json(
        users
    )
});
app.get("/api/v1/user/specificinfo", (req, res) => {
    let newUsers = users.map(({ name, age, address }) => {
        return { name, age, address }
    })
    res.status(200).json(
        newUsers
    )
});

app.get("/api/v1/user/:userId", (req, res) => {
    const userId = req.params.userId
    let user = users.find((u) => u.id == userId);
    if (user) {
        res.status(200).json({ ...user })

    } else {
        res.status(404).json("not found")
    }
})
app.get("/api/v1/user/:userId/:userName", (req, res) => {
    const userId = req.params.userId
    const userName = req.params.userName
    console.log("here");
    console.log(req.params);

    let user = users.find((u) => {
        
        
        return u.id == userId && u.name == userName;
    });
    if (user) {
        res.status(200).json(user.name)

    } else {
        res.status(404).json("not found")
    }
})
app.all("*", (req, res) => {
    res.status(404).send("<h1>Nothing found here</h1>")
})
app.listen(5000, () => {
    console.log("server is listening at port 5000.");

})