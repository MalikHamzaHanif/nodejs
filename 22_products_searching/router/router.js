const express = require("express");
const { staticProducts, dynamicProducts } = require("../controller/controller");

const router = express.Router();

router.route("/static").get(staticProducts);
router.route("/dynamic").get(dynamicProducts);

module.exports = router;