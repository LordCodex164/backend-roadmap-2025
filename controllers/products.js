const Product = require("../models/product").product;
const db = require("../utils/db")


exports.addProduct = function(req, res) {
    res.render('admin/add-product', {pageTitle: 'Add Product'});
}

exports.postAddProduct = function(req, res) {
    const {title, description, price, imageUrl} = req.body

    const newProduct = new Product(title,price,imageUrl,description, null, req.user._id.toString())

     newProduct.save()
     .then(result => {
        res.redirect("/")
     })
    .catch(err => {
        console.log("e", err)
    })
}

exports.getProducts = function(req, res) {

       Product.fetchAll()
       .then(products => {
          res.render('shop/product-list', { products, pageTitle: 'Shop', hasProducts: products.length > 0 })
       })
       .catch(err => {
         console.log(err)
       })
}

exports.getProduct = function(req, res) {

    const id = req.params.productId

    Product.findById(id)
    .then(product => {
        product = {
            ...product,
            _id: product._id.toString() 
        }
        res.render('shop/product-detail', { product, pageTitle: product.title })
    })
    .catch(err => {  
        console.log(err)
    })
}

exports.getEditProduct = function(req, res) {

    const isEdit = req.query.isEdit

    if(!isEdit) {
        return res.redirect("/")
    }

    const id = req.params.productId
    Product.findById(id)
    .then(product => {
        res.render('admin/edit-product', { product, pageTitle: 'Edit Product', productId: product._id.toString() })
    })
    .catch(err => {
        console.log(err)
    })
}

exports.updateProduct = function(req, res) {

    const {productId, title, description, price, imageUrl} = req.body

    Product.update(productId, {title, description, price, imageUrl})
    .then(result => {
        console.log("updated product")
        res.redirect("/")
    })
    .catch(err => {
        console.log(err)
    })
}

exports.deleteProduct = function(req, res) {
    const prodId = req.body.productId
    Product.delete(prodId)
     .then(result => {
        console.log("result deleted")
        res.redirect("/")
     })
     .catch(err => {
        console.log("err", err)
     })
}