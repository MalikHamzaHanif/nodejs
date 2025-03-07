
function authenticateUser(req, res, next) {
    const { name } = req.query;

    if (name == "hamza") {
        const user = {
            name: req.query.name,
            allowed: true
        }

        req.user = user
        next()
    } else {
        res.status(404).send("You are not allowed on this site b/c your name is not hamza");
    }
}

module.exports = authenticateUser