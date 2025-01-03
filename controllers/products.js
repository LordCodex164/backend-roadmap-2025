const product = require("../models/product")

exports.addProduct = function(req, res) {
    res.render('add-product', {pageTitle: 'Add Product'});
}

exports.postAddProduct = function(req, res) {
    const prod = new product(req.body.title)
    prod.save()
    res.redirect('/');
} 

exports.getProducts = function(req, res) {
    product.fetchAll((data) => {
        res.render('shop', { prods: data, pageTitle: 'Shop' });
    })
    
}