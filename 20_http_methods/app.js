let users = require("./users.json")
const express = require("express");
const app = express()
app.use(express.static("./public"))
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.get("/api/v1/user", (req, res) => {



    res.status(200).json({
        sucess: true,
        data: users
    })
})
app.get("/api/v1/user/:userId", (req, res) => {

    const { userId } = req.params;

    let requestedUser = users.find((user) => user.id == userId);
    if (requestedUser) {

        res.status(200).json({
            sucess: true,
            data: requestedUser
        })
    } else {
        res.status(404).json({
            sucess: false,
            data: "No user exists with the requested id"
        })

    }
})
app.post("/api/v1/user", (req, res) => {
    const { name, id } = req.body

    if (name && id) {
        users.push({ name, id });
        if (req.get("Content-Type") === "application/x-www-form-urlencoded") {

            res.redirect("/")
        } else {
            res.status(200).json({
                sucess: true,
                data: users
            })

        }
    } else {
        res.status(404).json({
            sucess: false,
            data: "Name or Id missing"
        })
    }

})
app.put("/api/v1/user/:userId", (req, res) => {
    const { userId } = req.params;
    const { name } = req.body
    let requestedUser;
    for (let i of users) {
        if (i.id == userId) {
            i.name = name;
            requestedUser = { name: i.name, id: i.id };
        }
    }

    if (requestedUser) {
        res.status(200).json({
            sucess: true,
            data: requestedUser
        })

    } else {
        res.status(404).json({
            sucess: false,
            data: "No user exists with the requested id"
        })

    }
})
app.delete("/api/v1/user/:userId", (req, res) => {
    const { userId } = req.params;
    let newUsers = [];
    for (let i of users) {
        if (i.id == userId) {
            continue

        }
        newUsers.push(i);
    }


    if (users.length == newUsers.length) {

        res.status(200).json({
            sucess: true,
            data: "no user found with this id"
        })
    } else {
        users = newUsers;
        res.status(404).json({
            sucess: false,
            data: "user got deleted successfully"
        })

    }
})

app.listen(5000, () => {
    console.log("server is listening at port 5000...");

})
