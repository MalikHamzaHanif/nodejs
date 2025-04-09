const { NOT_FOUND, UNAUTHORIZED, BAD_REQUEST, INTERNAL_SERVER_ERROR } = require("../error/error")
const asyncWrapper = require("../middleware/asyncwrapper")
const blogSchema = require("../model/blogmodel");
const { StatusCodes } = require("http-status-codes")
const getAllBlogs = asyncWrapper(async (req, res) => {
    const { userId } = req.user

    if (!userId) {
        throw new BAD_REQUEST("Something went wrong with the token.")
    }
    const blogs = await blogSchema.find({ createdBy: userId });
    if (blogs.length <= 0) {
        throw new NOT_FOUND("No blog created yet.")
    }
    return res.status(StatusCodes.OK).json({
        success: true, data: {
            msg: "blog data request successfull!",
            data: blogs
        }
    })

})

const getSingleBlog = asyncWrapper(async (req, res) => {
    const { userId } = req.user
    const { id } = req.params

    if (!userId || !id) {
        throw new BAD_REQUEST("Something went wrong with the token or invailed blog id.")
    }
    const blog = await blogSchema.findOne({ createdBy: userId, _id: id });
    if (!blog) {
        throw new NOT_FOUND("No blog found");
    }
    return res.status(StatusCodes.OK).json({
        success: true, data: {
            msg: "blog data request successfull!",
            data: blog
        }
    })

})
const createBlog = asyncWrapper(async (req, res) => {
    const { userId } = req.user
    const { title, content, category } = req.body

    if (!userId) {
        throw new BAD_REQUEST("Something went wrong with the token.");
    } else if (!title || !content || !category) {

        throw new BAD_REQUEST("Title, content or category missing");
    }

    const blog = await blogSchema.create({ ...req.body, createdBy: userId });

    return res.status(StatusCodes.OK).json({
        success: true, data: {
            msg: "blog created successfully",
            data: blog
        }
    })

})
const updateBlog = asyncWrapper(async (req, res) => {
    const { title, content, category } = req.body
    const { userId } = req.user
    const { id } = req.params

    if (!userId || !id) {
        throw new BAD_REQUEST("Something went wrong with the token or invailed blog id.")
    } else if (!title || !content || !category) {

        throw new BAD_REQUEST("Title, content or category missing");
    }

    const blog = await blogSchema.findOneAndUpdate({ createdBy: userId, _id: id }, { ...req.body, createdBy: userId }, { new: true, runValidators: true });

    return res.status(StatusCodes.OK).json({
        success: true, data: {
            msg: "blog updated successfully",
            data: blog
        }
    })

})
const deleteBlog = asyncWrapper(async (req, res) => {
    const { id } = req.params
    const { userId } = req.user
    if (!userId || !id) {
        throw new BAD_REQUEST("Something went wrong with the token or invailed blog id.")
    }

    const blog = await blogSchema.findOneAndDelete({ createdBy: userId, _id: id });

    return res.status(StatusCodes.OK).json({
        success: true, data: {
            msg: "blog deleted successfully",
            data: blog
        }
    })

})

module.exports = { getAllBlogs, getSingleBlog, updateBlog, deleteBlog, createBlog }