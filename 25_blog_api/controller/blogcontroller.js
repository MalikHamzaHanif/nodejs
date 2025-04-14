const mongo = require("mongoose");
const { NOT_FOUND, UNAUTHORIZED, BAD_REQUEST, INTERNAL_SERVER_ERROR } = require("../error/error")
const asyncWrapper = require("../middleware/asyncwrapper")
const blogSchema = require("../model/blogmodel");
const { StatusCodes } = require("http-status-codes");
const moment = require("moment")
// const fakeBlogs=require("../fakeblogdata.json")
const getAllBlogs = asyncWrapper(async (req, res) => {
    const { userId } = req.user
    let queryObject = {
        createdBy: userId
    }
    let { sort, category, search, page } = req.query

    if (search) {
        queryObject.content = { $regex: search, $options: "i" }
        queryObject.title = { $regex: search, $options: "i" }
    }

    if (category && category !== "All") {
        queryObject.category = category
    }
    if (!userId) {
        throw new BAD_REQUEST("Something went wrong with the token.")
    }
    let response = blogSchema.find({ ...queryObject });

    if (sort === "z-a") {
        response = response.sort("-title")
    }
    if (sort === "a-z") {
        response = response.sort("title")
    }
    if (sort === "latest") {
        response = response.sort("createdAt")
    }
    if (sort === "oldest") {
        response = response.sort("-createdAt")
    }

    if (!page) {
        page = 1
    } else {
        page = Number(page)
    }
    const limit = 10
    const skip = (page - 1) * limit
    response = response.skip(skip).limit(limit)
    const blogs = await response;

    const totalDocs = await blogSchema.countDocuments(queryObject)
    const totalPages = Math.ceil(totalDocs / limit)

    if (blogs.length <= 0) {
        throw new NOT_FOUND("No blog created yet.")
    }
    return res.status(StatusCodes.OK).json({
        success: true,
        totalPages
        , data: {
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

const showCategory = asyncWrapper(async (req, res) => {


    const category = await blogSchema.aggregate([
        {
            $match: {
                createdBy: new mongo.Types.ObjectId(req.user.userId)
            }
        },
        {
            $group: { _id: "$category", total: { $sum: 1 } }
        }

    ]);


    const stats = category.reduce((acc, curr) => {
        const { _id: title, total } = curr;
        acc[title] = total
        return acc
    }, {});

    const defaultValues = {
        other: stats.other || 0,
        technology: stats.technology || 0,
        fashion: stats.fashion || 0,
        politics: stats.politics || 0,
    }

    let monthlyCategories = await blogSchema.aggregate([
        {
            $match: { createdBy: new mongo.Types.ObjectId(req.user.userId) }

        },
        {
            $group: { _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } }, count: { $sum: 1 } }
        },
        {
            $sort: { "_id.year": -1, "_id.month": -1 }
        },
        {
            $limit: 6
        }
    ])

    monthlyCategories = monthlyCategories.map((item) => {
        const { _id: { year, month }, count } = item;
        const date = moment().month(month - 1).year(year).format("MMM Y")
        return { date, count }
    }).reverse()


    return res.status(StatusCodes.OK).json({
        success: true, data: {
            msg: "Request successfull",
            data: {
                defaultValues,
                monthlyCategories
            }
        }
    })
})

module.exports = { getAllBlogs, getSingleBlog, updateBlog, deleteBlog, createBlog, showCategory }