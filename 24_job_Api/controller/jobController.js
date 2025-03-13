const { NOT_FOUND } = require('../error/error');
const job = require("../model/jobModel");
const asyncWrapper = require('../middleware/asyncWrapperMiddleware');
const { StatusCodes } = require('http-status-codes');
const getAllJobs = asyncWrapper(async (req, res) => {
    const { userId } = req.user
    const newJob = await job.find({ createdBy: userId });

    res.status(StatusCodes.OK).json({ newJob, nbHits: newJob.length });
})
const getSingleJob = asyncWrapper(async (req, res) => {
    const { userId } = req.user
    const { id: jobId } = req.params
    const newJob = await job.findOne({ createdBy: userId, _id: jobId });
    if (!newJob) {
        return res.status(StatusCodes.OK).json("No job found");
    }
    res.status(StatusCodes.OK).json({ newJob, msg: "Job found successfully" });
})
const createJob = asyncWrapper(async (req, res) => {
    const { userId } = req.user
    req.body.createdBy = userId

    const newJob = await job.create({ ...req.body });
    if (!newJob) {
        throw new NOT_FOUND("Unable to create job please login again try again.");
    }
    res.status(StatusCodes.OK).json({ newJob, msg: "Job created successfully" });

})
const updateJob = asyncWrapper(async (req, res) => {
    const { userId } = req.user
    const { id: jobId } = req.params

    const newJob = await job.findOneAndUpdate({ createdBy: userId, _id: jobId }, { ...req.body }, { new: true, runValidators: true });
    if (!newJob) {
        return res.status(StatusCodes.OK).json("No job found");
    }
    res.status(StatusCodes.OK).json({ newJob, msg: "Job updated successfully" });
})
const deleteJob = asyncWrapper(async (req, res) => {
    const { userId } = req.user
    const { id: jobId } = req.params
    const newJob = await job.findOneAndDelete({ createdBy: userId, _id: jobId });
    if (!newJob) {
        return res.status(StatusCodes.OK).json("No job found");
    }
    res.status(StatusCodes.OK).json({ newJob, msg: "Job deleted successfully" });
})


module.exports = { getAllJobs, createJob, updateJob, getSingleJob, deleteJob }