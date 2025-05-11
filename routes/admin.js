const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');
const createCrsfToken = require('../middleware/crsfToken');

router.get('/add-product', createCrsfToken, productController.addProduct);

router.post('/add-product', productController.postAddProduct);

router.get('/edit-product/:productId', createCrsfToken, productController.getEditProduct);

router.put('/edit-product/:productId', productController.updateProduct);

router.delete("/product/:productId", createCrsfToken, productController.deleteProduct)

exports.routes = router;
