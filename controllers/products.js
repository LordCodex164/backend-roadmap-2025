const Product = require("../models/product");
const db = require("../utils/db")


exports.addProduct = function(req, res) {
    res.render('admin/add-product', {pageTitle: 'Add Product'});
}

exports.postAddProduct = function(req, res) {
    const {title, description, price, imageUrl} = req.body
    Product.create({
      title,
      price,
      imageUrl,
      description
    })
    .then(result => {
        res.redirect("/")
    })
    .catch(err => {
        console.log("e", err)
    })
}

exports.getProducts = function(req, res) {
       Product.findAll()
       .then(products => {
          res.render('shop/product-list', { products, pageTitle: 'Shop', hasProducts: products.length > 0 })
       })
       .catch(err => {
         console.log(err)
       })
}

exports.getProduct = function(req, res) {
    const id = req.params.productId
    Product.findByPk(id)
    .then(product => {
        res.render('shop/product-detail', { product, pageTitle: product.title })
    })
    .catch(err => {  
        console.log(err)
    })
}