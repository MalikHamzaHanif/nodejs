const express = require("express")
const router = express.Router()
const { getAllTasks, getSingleTask, updateTask, postTask, deleteTask } = require("../controllers/controller");

router.route("/").get(getAllTasks).post(postTask)
router.route("/:id").get(getSingleTask).patch(updateTask).delete(deleteTask)

module.exports = router