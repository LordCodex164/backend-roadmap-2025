const express = require('express')
const cartController = require("../controllers/cart")
const createCrsfToken = require('../middleware/crsfToken');

const router = express.Router()

router.get("/", createCrsfToken, cartController.getCartProducts)

router.get('/cart', cartController.getCart)

router.post("/add-to-cart", cartController.postCart)

router.post("/delete-cart", cartController.deleteCartProduct)

module.exports = router