const Product = require("../models/product");


exports.addProduct = function(req, res) {

    const isLoggedIn = req.session.isLoggedIn;

    console.log("body", req.body)

    res.render('admin/add-product', {pageTitle: 'Add Product', isAuthenticated: isLoggedIn, errorMessage: req.flash("error")});
}

exports.postAddProduct = function(req, res) {

    console.log(1, "it runs")

    const isLoggedIn = req.session.isLoggedIn;

    if(!req.file){
        req.flash("error", "Please attach a valid image") 
        return res.redirect('/admin/add-product');
    }

    const {title, description, price} = req.body

    const newProduct = new Product({title, price,imageUrl: req.file.path, description, userId: req.user})
     .save()
     .then(result => {
        res.redirect("/admin/add-product")
     })
    .catch(err => {
        console.log("e", err)
    })
}


exports.getProducts = function(req, res) {

    const isLoggedIn = req.session.isLoggedIn;

       Product.find()
    //    .select("price imageUrl -_id")
    //    .populate("userId", "name email -_id", )
       .then(products => {
          res.render('shop/product-list', { products, pageTitle: 'Shop', hasProducts: products.length > 0, isAuthenticated: isLoggedIn, errorMessage: req.flash("error")})
       })
       .catch(err => {
         console.log(err)
       })
}

exports.getProduct = function(req, res) {
 
    const id = req.params.productId

    const isLoggedIn = req.session.isLoggedIn;

    console.log("tok",req.session.csrfToken)

    console.log("body", req.body)

    Product.findById(id)
    .then(product => {
        res.render('shop/product-detail', { product, pageTitle: product.title, isAuthenticated: isLoggedIn })
    })
    .catch(err => {  
        console.log(err)
    })
}

exports.getEditProduct = function(req, res) {

    const isEdit = req.query.isEdit

    const isLoggedIn = req.session.isLogged;

    if(!isEdit) {
        return res.redirect("/")
    }

    const id = req.params.productId
    Product.findById(id)
    .then(product => {
        res.render('admin/edit-product', { product, pageTitle: 'Edit Product', productId: product._id.toString(), isAuthenticated: isLoggedIn })
    })
    .catch(err => {
        console.log(err)
    })  
} 

exports.updateProduct = function(req, res) {

    const {productId, title, description, price, imageUrl} = req.body

    Product.findByIdAndUpdate(productId, {title, description, price, imageUrl})
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
    Product.findByIdAndDelete(prodId)
     .then(result => {
        console.log("result deleted")
        res.redirect("/")
     })
     .catch(err => {
        console.log("err", err)
     })
}