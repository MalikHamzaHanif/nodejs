const express = require("express");
const router = express.Router();
const { getAllProducts, createProduct, deleteProduct } = require("../controller/productController");
const { uploadProduct, destroyProduct } = require("../controller/uploadController");
router.route("/").get(getAllProducts).post(uploadProduct,createProduct);
router.route("/:id").delete(destroyProduct,deleteProduct);
module.exports = router