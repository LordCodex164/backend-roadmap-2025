const express = require('express')
const admin = require("./admin")

const router = express.Router()

router.get("/", (req, res, next) => {
    res.render('shop', {pageTitle: 'Shop', products: admin.products, hasProducts: admin.products.length > 0})
    //res.send("<h1>Hello from Express!</h1>")
})

module.exports = router