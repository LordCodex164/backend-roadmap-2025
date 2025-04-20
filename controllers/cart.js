const Product = require("../models/product").product;
const db = require("../utils/db")

exports.addCart = function(req, res) {
    const isLoggedIn = req.session.isLoggedIn;
    res.render('admin/add-product', {pageTitle: 'Add Product', isAuthenticated: isLoggedIn});
}

exports.postCart = function(req, res) {

  const productId = req.body.productId

  if(req.body._csrf === req.session.csrfToken){
    console.log(1, req.user)
    req.user.addToCart(productId)
    .then(result => {
      console.log("cb", result)
      req.session.user.cart = result
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

      const isLoggedIn = req.session.isLoggedIn;

      console.log(1, isLoggedIn)

       req.user?.getCart()
       .then(products => {
          res.render('cart', { products, pageTitle: 'Shop', hasProducts: products.length > 0, isAuthenticated: isLoggedIn })
       })
       .catch(err => {
         console.log(err)
       })
}

exports.getCartProducts = function(req, res) {

  const isLoggedIn = req.session.isLoggedIn;

  const items = req.session.user.cart.items

  console.log("it", items)

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

  req.user.deleteCart(id)
    .then(result => {
      console.log("r", result)
      res.redirect("/")
    })
  .catch(err => {
    console.log("err", err)
  })

}