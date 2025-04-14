const { StatusCodes } = require("http-status-codes");
const asyncWrapper = require("../middleware/asyncwrapper");
const product = require("../model/productModel");
const getAllProducts = asyncWrapper(async (req, res) => {
    const data = await product.find();
    res.status(StatusCodes.OK).json({
        success: true, data: {
            msg: "Product created successfully",
            data
        }
    })
})
const createProduct = asyncWrapper(async (req, res) => {

    // const img = req.files.image
    // const imgPath=path.join(__dirname,"../public", "images",img.name);
    // await img.mv(imgPath)
    console.log(req.image);

    const { name, imageurl, publicid } = req.image
    const data = await product.create({ name, imageurl, publicid })
    res.status(StatusCodes.OK).json({
        success: true, data: {
            msg: "Product created successfully",
            data
        }
    })
})
const deleteProduct = asyncWrapper(async (req, res) => {
    res.status(StatusCodes.OK).json({
        success: true, data: {
            msg: "Product deleted successfully",
            data: req.data
        }
    })
})

module.exports = { getAllProducts, createProduct, deleteProduct }