const asyncWrapper = require("../middleware/async_wrapper");
const productSchema = require("../model/products_schema");


const staticProducts = asyncWrapper(async (req, res) => {
    const data = await productSchema.find({ name: "Lounge Chair" })
    res.status(200).send({
        nbHits: data.length,
        data
    });
})

const dynamicProducts = asyncWrapper(async (req, res) => {
    const { name, company, featured, sort, fields, page, limit, numericFilters } = req.query
    let queryProduct = {};

    if (name) {
        queryProduct.name = { $regex: name, $options: 'i' };
    }
    if (company) {
        queryProduct.company = { $regex: company, $options: 'i' }
    }
    if (featured) {
        queryProduct.featured = featured == "true" ? true : false;
    }
    if (numericFilters) {
        const regex = /\b(<|>|=|>=|<=)\b/g
        const filters = {
            ">": "$gt",
            "<": "$lt",
            ">=": "$gte",
            "<=": "$lte",
            "=": "$eq",
        }
        let newFilters = numericFilters.replace(regex, (match) => {
            return `-${filters[match]}-`
        });

        const options = ["price", "rating"];

        newFilters = newFilters.split(",").forEach(element => {
            const [field, operator, value] = element.split("-")
            if (options.includes(field)) {
                queryProduct[field] = { [operator]: Number(value) }
            }
        });
    }
    let product = productSchema.find(queryProduct)
    if (sort) {

        const sortList = sort.split(",").join(" ")
        product = product.sort(sortList);
    }
    if (fields) {

        const fieldList = fields.split(",").join(" ")
        product = product.select(fieldList);
    }
    if (page && limit) {
        const skip = (page - 1) * limit;
        product = product.limit(limit).skip(skip);
    }





    const data = await product
    res.status(200).send({ nbHits: data.length, data })

})
module.exports = { dynamicProducts, staticProducts };


"http://localhost:5000/api/v1/product/dynamic?name=t&company=i&fields=name,rating,price,company&sort=price&limit=6&page=1&numericFilters=price>30,rating<4"