const asyncWrapper = require("../middleware/asyncwrapper");
const cloudinary = require("cloudinary").v2;
const BadRequest = require("../error/badrequest");
const product = require("../model/productModel");
const { INTERNAL_SERVER_ERROR } = require("../error/error");
const fs = require("fs")
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});
const uploadProduct = asyncWrapper(async (req, res, next) => {

    const img = req.files.image
    if (img.size > 1024 * 1024) {
        throw new BadRequest("File size can not be more then 1 MB")
    }

    if (!img.mimetype.startsWith("image/")) {
        throw new BadRequest("image is required")
    }
    const imageUrl = await cloudinary.uploader.upload(img.tempFilePath, {
        use_filename: true,
        folder: "upload-file"
    });
    fs.unlinkSync(img.tempFilePath)
    req.image = {

        imageurl: imageUrl.secure_url,
        publicid: imageUrl.public_id,
        name: img.name

    }
    next();
})
const destroyProduct = asyncWrapper(async (req, res, next) => {
    const { id } = req.params
    if (!id) {
        throw new BadRequest("id is required");
    }
    const data = await product.findOne({ _id: id })
    const { publicid } = data
    const { result } = await cloudinary.uploader.destroy(publicid)
    if (result === "ok") {
        req.data = data
        next()
    } else {
        throw new INTERNAL_SERVER_ERROR("File Deletion failed");
    }
})

module.exports = { uploadProduct, destroyProduct }



