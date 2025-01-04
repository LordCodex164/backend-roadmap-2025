const product = require("../models/product")
const db = require("../utils/db")

exports.addProduct = function(req, res) {
    res.render('admin/add-product', {pageTitle: 'Add Product'});
}

exports.postAddProduct = function(req, res) {
    const {title, description, price, imageUrl} = req.body
    const prod = new product(title, price, description, imageUrl)
    console.log("p", prod)
    prod.save()
    .then(() => res.redirect("/"))
    .catch(err => console.log("err", err))
} 

exports.getProducts = function(req, res) {
       product.fetchAll(products => {
        res.render('shop/product-list', { products, pageTitle: 'Shop', hasProducts: products.length > 0 })
       })
}