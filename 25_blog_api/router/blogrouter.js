const express = require("express");
const router = express.Router();
const { getAllBlogs, getSingleBlog, updateBlog, deleteBlog, createBlog, showCategory } = require("../controller/blogcontroller");
const testUserMiddleware = require("../middleware/testusermiddleware");
router.route("/").get(getAllBlogs).post(testUserMiddleware,createBlog);
router.route("/category").get(showCategory)
router.route("/:id").get(getSingleBlog).patch(testUserMiddleware, updateBlog).delete(testUserMiddleware, deleteBlog);
module.exports = router