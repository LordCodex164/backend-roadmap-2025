const express = require('express')
const admin = require("./admin")
const products = require("../controllers/products")

const router = express.Router()

router.get("/", products.getProducts)

module.exports = router