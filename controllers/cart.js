const Product = require("../models/product").product;
const db = require("../utils/db")

exports.addCart = function(req, res) {
    res.render('admin/add-product', {pageTitle: 'Add Product', isAuthenticated: isLoggedIn});
}

exports.postCart = function(req, res) {

  const productId = req.body.productId

  if(req.csrfToken === req.session.csrfToken){
    req.user.addToCart(productId)
    .then(result => {
      res.redirect("/")
    })
    .catch(err => {
      console.log(err)
    })
  }
  else {
    req.flash("error", "Invalid csrf token")
    res.redirect("/")
  }

} 

exports.getCart = function(req, res) {

      const isLoggedIn = req.session.isLogged;

       req.user?.getCart()
       .then(products => {
          res.render('cart', { products, pageTitle: 'Shop', hasProducts: products.length > 0, isAuthenticated: isLoggedIn })
       })
       .catch(err => {
         console.log(err)
       })
}

exports.getCartProducts = function(req, res) {

  const isLoggedIn = req.session.isLogged;

  req.user?.getAllCart()
  .then(prods => {
     res.render("cart/product-list", {products: prods ? prods: [], pageTitle: 'Cart Products', hasProducts: prods?.length > 0, isAuthenticated: isLoggedIn})
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