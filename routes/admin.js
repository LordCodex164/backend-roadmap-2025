const express = require('express');

const router = express.Router();

const rootDir = require('../utils/path');
const path = require('path');

const productController = require('../controllers/products')

const products = [];

router.get('/add-product', productController.addProduct);

router.post('/add-product', productController.postAddProduct);

exports.routes = router;
exports.products = products;