let users = require("../users.json")
const getAllUsers=(req, res) => {


        res.status(200).json({
            sucess: true,
            data: users
        })
    }
const getSingleUser=(req, res) => {

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
}


const postUser=(req, res) => {
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

}

const updateUser=(req, res) => {
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
}

const deleteUser= (req, res) => {
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
}

module.exports={
    getAllUsers,
    getSingleUser,
    updateUser,
    postUser,
    deleteUser
}
