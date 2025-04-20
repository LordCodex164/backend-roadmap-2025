const express = require('express')
const orderController = require("../controllers/order")
const isAuth = require("../middleware/isAuth")
const createCrsfToken = require('../middleware/crsfToken');

const router = express.Router()

router.get("/", createCrsfToken, isAuth, orderController.getOrders)

router.post("/checkout", createCrsfToken, isAuth, orderController.checkoutOrder)

router.get("/get_invoice/:order_id", createCrsfToken, isAuth, orderController.downloadInvoice)

module.exports = router