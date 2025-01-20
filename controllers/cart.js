const Product = require("../models/product").product;
const db = require("../utils/db")

exports.addCart = function(req, res) {
    res.render('admin/add-product', {pageTitle: 'Add Product'});
}

exports.postCart = function(req, res) {

  const productId = req.body.productId

  req.user.addToCart(productId)
  .then(result => {
     res.redirect("/")
  })
  .catch(err => {
    console.log(err)
  })
}

exports.getCart = function(req, res) {
       req.user.getCart()
       .then(products => {
          res.render('cart', { products, pageTitle: 'Shop', hasProducts: products.length > 0 })
       })
       .catch(err => {
         console.log(err)
       })
}


exports.getCartProducts = function(req, res) {

  req.user.getAllCart()
  .then(prods => {
     res.render("cart/product-list", {products: prods ? prods: [], pageTitle: 'Cart Products', hasProducts: prods?.length > 0})
  })
  .catch(err => {
    console.log(err)
  })

}

exports.deleteCartProduct = function (req, res) {

  const id = req.body.productId

  console.log("id", id)

  req.user.deleteCart(id)
    .then(result => {
      console.log("r", result)
      res.redirect("/")
    })
  .catch(err => {
    console.log("err", err)
  })
}