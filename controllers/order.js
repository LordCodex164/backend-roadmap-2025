const Order = require("../models/order")
const path = require("path")
const fs = require("fs")
const pdfDocument = require("pdfkit")

exports.checkoutOrder = function (req, res, next) {
    /*get the products that we are sending from the cart */

    //mongodb way 

    console.log(req.session)

    const userId = req.session.user._id

    const items = req.session.user.cart.items

    const newOrder = new Order()

    newOrder.addOrder(userId, items)
    .then(order => {
       res.redirect("/")
    })
    .catch(err => {
        console.log(err)
    })
    
    //sequelize way of doing things
    // let product
    // let fetchedOrders;
    // let createdOrder;
    // let fetchedProducts;
    // req.user.getCart()
    // .then(cart => {
    //   fetchedProducts = cart.getProducts()
    //   return fetchedProducts
    // })
    // .then(result => {
    // //we then create an order when there are products
    //   createdOrder = req.user.createOrder()
    //   return createdOrder
    // })
    // .then(newOrder => {
    //     //then we get the actual order id for the user
    //     fetchedOrders = req.user.getOrders({where: {id: newOrder.id}})
    //     return fetchedOrders
    // })
    // .then(orders => {
    //     let order; 
    //     order = orders[0]
    //     let dQuantity = 2
    //     fetchedProducts
    //     .then(products => {
    //         for(let i = 0; i< products.length; i++){
    //             product = products[i]
    //             console.log(product.cartitem.quantity)
    //             order.addProduct(product, {through: {quantity: product.cartitem.quantity}})
    //         }
    //     })
    //   })
    //   .then(result => {
    //     product.cartitem.destroy()
    //     res.redirect("/")
    //   })
    // .catch(err => {
    //     console.log(err)
    // })
}

//we can do this way with lazy loading
exports.getOrders = function (req, res, next) {

   let userId = req.user._id;

   const isLoggedIn = req.session.isLoggedIn;

     Order
    .find({userId})
    .populate("items.productId")
    .select("")
    // .execPopulate()
    .then(orders => {
        console.log("o", orders)
       return res.render("order/order-list", {orders, pageTitle: 'Orders', hasOrders: orders?.length > 0, isAuthenticated: isLoggedIn})
    })
    .catch(err => {
        console.log(err)
    })

    //sequelize way
    // .then(orders => {
    //       // Create an array of promises for getting products from each order 
    //       const prodPromises = orders.map(order => {
    //          return order.getProducts()
    //          .then(dbProducts => {
    //             if(dbProducts.length > 0){
    //              products.push(...dbProducts)
    //             }
    //          })
    //       })  
    //       return Promise.all(prodPromises)
    // })
    // .then(result => {
    //     //console.log("p", products)
   // res.render("order/order-list", {orders: products, pageTitle: 'Orders', hasOrders: products.length > 0})
    // })
    // .catch(err => {
    //     console.log(err)
    // })

}

//or this way with eager loading where we include model related to another

exports.getOrdersProducts = function (req) {
    req.session.user
    .getOrders({include: ["Products"]})
    .then(orders => {
        console.log("o", orders)
    })
    .catch(err => {
        console.log(err)
    })
}

exports.downloadInvoice = function (req, res) {
    try{
    const orderId = req.params.order_id
    const invoicename = "invoice-" + orderId + ".pdf"
    const invoicePath = path.join("data", "invoice", invoicename)
    Order.findById(orderId)
    .populate({
        path: "items",
        populate:{
            path: "productId"
        }
    })
    .then(order => {
        order.items.forEach((item) => {
            console.log(item)
            res.setHeader("Content-Type", "application/pdf")
            res.setHeader("Content-Disposition", "inline; filename=" + invoicename)
            const pdfDoc = new pdfDocument()
            pdfDoc.pipe(fs.createWriteStream(invoicePath))
            pdfDoc.pipe(res) 
            pdfDoc.text("Here is your invoice " + item.productId.title + " is the name of your product and here is the price " + item.productId.price)
            pdfDoc.end()
        })
    })
    }
    catch(err) {
        console.log(err)
        res.status(500).send("Error downloading invoice")
    }
}