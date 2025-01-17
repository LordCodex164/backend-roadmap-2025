const Product = require("../models/product").product;
const db = require("../utils/db")

exports.addCart = function(req, res) {
    res.render('admin/add-product', {pageTitle: 'Add Product'});
}

exports.postCart = function(req, res) {

  const productId = req.body.productId

   const newProduct = new Product(
     null,
     null,
     null,
     null,
     null,
     req.user._id,
     req.user.cart
   )

  newProduct.addToCart(productId)
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

    const {items: products} = req.user.cart

    console.log("p", products)

    const mappedPromise = products.map((item) => {
      return Product.findById(item.productid)
      .then(products => {
         return {...products, quantity: item.quantity}
      })
      .catch(err => {
        console.log(err)
      })
    })
    return Promise.all(mappedPromise)
    .then(prods => {
      console.log("P", prods)
      res.render("cart/product-list", {products: prods, pageTitle: 'Cart Products', hasProducts: prods.length > 0})
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