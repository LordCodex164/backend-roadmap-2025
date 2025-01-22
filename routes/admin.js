const express = require('express');

const router = express.Router();

const rootDir = require('../utils/path');
const path = require('path');

const productController = require('../controllers/products')


router.get('/add-product', productController.addProduct);

router.post('/add-product', productController.postAddProduct);

router.get('/edit-product/:productId', productController.getEditProduct);

router.post('/edit-product', productController.updateProduct);

router.post("/delete-product", productController.deleteProduct)

exports.routes = router;
