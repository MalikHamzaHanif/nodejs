const express = require("express");
const router = express.Router();
const { getAllJobs, createJob, updateJob, getSingleJob, deleteJob } = require('../controller/jobController');

router.route("/").post(createJob).get(getAllJobs);
router.route("/:id").get(getSingleJob).patch(updateJob).delete(deleteJob);
module.exports = router;