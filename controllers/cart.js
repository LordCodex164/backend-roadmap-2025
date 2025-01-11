const Product = require("../models/product");
const db = require("../utils/db")

exports.addCart = function(req, res) {
    res.render('admin/add-product', {pageTitle: 'Add Product'});
}

exports.postCart = function(req, res) {
    const {productId} = req.body
    console.log("id", productId)
    let fetchedCart
    let newQuantity = 1
    req.user.getCart()
    .then(cart => {
         console.log("c", cart.id)
        fetchedCart = cart
        return cart.getProducts({where: {id: productId}})
    })
    .then(products => {
      let product
      if(products.length > 0){
        product = products[0]
      }
      if(product){
        newQuantity = product.cartitem.quantity + 1
        return product
      }
      return Product.findByPk(productId)
    })
    .then(product => {
      return fetchedCart.addProduct(product, {through: {quantity: newQuantity}})
     })
    .then(result => {
      res.redirect("/")
    })
    .catch(err => {
        console.log("e", err)
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
  
  req.user.getCart()
  .then(cart => {
    console.log("c", cart)
     return cart.getProducts()
  })
  .then(products => {
    res.render("cart/product-list", {products, pageTitle: 'Cart Products', hasProducts: products.length > 0})
  })
  .catch(err => {
    console.log(err)
  })
}

exports.deleteCartProduct = function (req, res) {
  const id = req.body.productId
  req.user.getCart()
  .then(cart => {
    if(!cart){
      throw new Error("cart not found")
    }
    return cart.getProducts({where: {id}})
    .then(products => {
      let prod

      if(products.length > 0){
        prod = products[0]
      }

       return prod.cartitem.destroy()
    })
    .then(result => {
      res.redirect("/")
    })
  })
  .catch(err => {
    console.log("err", err)
  })
}