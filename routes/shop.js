const express = require('express')
const admin = require("./admin")
const products = require("../controllers/products")
const createCrsfToken = require('../middleware/crsfToken');

const router = express.Router()

router.get("/", createCrsfToken, products.getProducts)

router.get("/product/:productId", products.getProduct)

module.exports = router