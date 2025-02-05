const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');
const createCrsfToken = require('../middleware/crsfToken');

router.get('/add-product', createCrsfToken, productController.addProduct);

router.post('/add-product', productController.postAddProduct);

router.get('/edit-product/:productId', productController.getEditProduct);

router.post('/edit-product', productController.updateProduct);

router.post("/delete-product", productController.deleteProduct)

exports.routes = router;
