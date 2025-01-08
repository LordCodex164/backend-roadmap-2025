const Product = require("../models/product");
const db = require("../utils/db")


exports.addProduct = function(req, res) {
    res.render('admin/add-product', {pageTitle: 'Add Product'});
}

exports.postAddProduct = function(req, res) {
    const {title, description, price, imageUrl} = req.body

    req.user.createProduct({
        title,
        price,
        imageUrl,
        description,
    })
    .then(result => {
        res.redirect("/")
    })
    .catch(err => {
        console.log("e", err)
    })
}

exports.getProducts = function(req, res) {

       req.user.getProducts()
       .then(products => {
          res.render('shop/product-list', { products, pageTitle: 'Shop', hasProducts: products.length > 0 })
       })
       .catch(err => {
         console.log(err)
       })
}

exports.getProduct = function(req, res) {

    const id = req.params.productId

    req.user.getProducts({where: {id}})
    .then(products => {
        const product = products[0]
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
    req.user.getProducts({where: {id}})
    .then(products => {
        const product = products[0]
        res.render('admin/edit-product', { product, pageTitle: 'Edit Product' })
    })
    .catch(err => {
        console.log(err)
    })
}

exports.updateProduct = function(req, res) {

    const {productId, title, description, price, imageUrl} = req.body

    req.user.getProducts({where: {id: productId}})
    .then(products => {
        const product = products[0]
        product.title = title
        product.description = description
        product.price = price
        product.imageUrl = imageUrl
        return product.save()
    })
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
 
    req.user.getProducts({where: {id: prodId}})
    .then(products => {
        if(products.length < 1){
            throw new Error("No Products Found")
        }
       return products[0].destroy()
     })
     .then(result => {
        console.log("result destroyed")
        res.redirect("/")
     })
     .catch(err => {
        console.log("err", err)
     })
}