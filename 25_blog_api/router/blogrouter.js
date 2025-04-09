const express = require("express");
const router = express.Router();
const { getAllBlogs,getSingleBlog,updateBlog,deleteBlog,createBlog }=require("../controller/blogcontroller")
router.route("/").get(getAllBlogs).post(createBlog);
router.route("/:id").get(getSingleBlog).patch(updateBlog).delete(deleteBlog);
module.exports = router