const express = require("express");
const { makePayment } = require("../controller/paymentcontroller.js");
const fs = require("fs");
const path = require("path")
const router = express.Router()

router.route("/make-payment-page").get(async (req, res) => {
    const filePath = path.resolve(__dirname, "../public/index.html")
    res.sendFile(path.resolve(__dirname, "../public/index.html"))
    // const file=fs.readFileSync(filePath)
    // res.status(200).type("html").send(file)
    // const fileStream = fs.createReadStream(filePath, { highWaterMark: 6000, encoding: "utf-8" });
    // res.setHeader("Content-Type", "text/html");
    // fileStream.pipe(res)
}).post(makePayment)


module.exports = router