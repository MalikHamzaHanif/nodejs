const express = require("express")
const router = express.Router();

const {
    getAllUsers,
    getSingleUser,
    updateUser,
    postUser,
    deleteUser } = require("../controller/controllers");
// router.get("/",getAllUsers)
// router.get("/:userId",getSingleUser )
// router.post("/", postUser)
// router.put("/:userId", updateUser)
// router.delete("/:userId",deleteUser)

router.route("/").get(getAllUsers).post(postUser);
router.route("/:id").get(getSingleUser).put(updateUser).delete(deleteUser)


module.exports = router