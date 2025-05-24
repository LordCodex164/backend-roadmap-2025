const express = require('express')
const orderController = require("../controllers/order")
const isAuth = require("../middleware/isAuth")
const createCrsfToken = require('../middleware/crsfToken');

const router = express.Router()

router.get("/", createCrsfToken, isAuth, orderController.getOrders)

router.post("/checkout-order", createCrsfToken, isAuth, orderController.checkoutOrder)

router.get("/get_invoice/:order_id", createCrsfToken, isAuth, orderController.downloadInvoice)

router.get("/checkout", isAuth, createCrsfToken, orderController.getCheckout)

router.get("/checkout/success", isAuth, createCrsfToken, orderController.checkoutSuccess)

router.get("/checkout/cancel", isAuth, createCrsfToken, orderController.checkoutOrder)

module.exports = router