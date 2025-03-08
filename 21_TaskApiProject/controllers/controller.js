const asyncWrapper = require('../middlewares/asyncWrapper');
const { customErrorHandler } = require('../middlewares/customError');
const taskSchema = require("../model/schema");
const getAllTasks = asyncWrapper(async (req, res) => {
    const task = await taskSchema.find({});
    res.status(200).json({ task });
})
const getSingleTask = asyncWrapper(async (req, res) => {
    const { id: taskId } = req.params;
    const task = await taskSchema.findOne({ _id: taskId });
  
    
    if(!task){
        throw customErrorHandler(404,"Task Not Found");
        // throw Error()
    }
    res.status(200).json({ task });
})
const postTask = asyncWrapper(async (req, res) => {
    const task = await taskSchema.create({ ...req.body });
    res.status(200).json({ task });
})
const updateTask = asyncWrapper(async (req, res) => {
    const { id: taskId } = req.params;
    const task = await taskSchema.findOneAndUpdate({ _id: taskId }, { ...req.body }, { new: true, runValidators: true });
    if(!task){
        throw customErrorHandler(404,"No task with this id");
    }
    res.status(200).json({ task });
})
const deleteTask = asyncWrapper(async (req, res) => {
    const { id: taskId } = req.params;
    const task = await taskSchema.findOneAndDelete({ _id: taskId });
    if(!task){
        throw customErrorHandler(404,"Something went wrong while deleting task");
    }
    res.status(200).json({ task });
})

module.exports = { getAllTasks, getSingleTask, updateTask, postTask, deleteTask }