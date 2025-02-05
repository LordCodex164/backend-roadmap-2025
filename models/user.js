//Mongodb Driver

// const { product } = require("../models/product")
// const { getDb } = require("../utils/db")
// const { ObjectId } = require("mongodb")
// const Product = require("../models/product").product

// class User {
//    constructor(email, username, id, carts) {
//      this.email = email,
//      this.username = username,
//      this.id = id,
//      this.carts = carts
//    }

//    save(){
//      const db = getDb()
//      return db.collection("users").insert(this)
//      .then(result => {
//        return result
//      })
//      .catch(err => {
//       console.log(err) 
//      })
//    }

//    addToCart(prodId){

//     console.log(this)
//     //find index of the item in the cart

//     let userCartItems;

//     userCartItems = this.carts.items ? this.carts.items : []

//     const cartProductIndex = userCartItems.findIndex(cb => {
//         return cb.productid == prodId
//     })

//     console.log(cartProductIndex)

//     let updatedUserCarts = [...userCartItems]

//     let newQuantity = 1

//     if(cartProductIndex >= 0){
//        newQuantity = this.carts.items[cartProductIndex].quantity + 1
//        updatedUserCarts[cartProductIndex] = {productid: prodId, quantity: newQuantity}
//     }
//     else {
//      updatedUserCarts.push({
//         productid: prodId,
//         quantity: newQuantity
//      })
//     }  

//      const updatedCart = {
//        items: updatedUserCarts,
//        status: "active"
//      }

//      if(updatedCart){
//        const db = getDb()

//        //update user cart
//      return db.collection("users").updateOne(
//        {_id: new ObjectId(String(this.id))},
//        {$set: {cart: updatedCart}}
//      )
//      .then(result => {
//        return result
//      })
//      .catch(err => {
//        console.log(err)
//      })
//      }
//    }

//    getAllCart(){

//     let userCartItems = [];

//     let updatedCart = []

//     let fetchedProducts

//     const db = getDb()

//     return db.collection("users").findOne({_id: this.id})
//     .then(user => {
//       userCartItems = user.cart.items ? user.cart.items : []
//       console.log(userCartItems, "items")
//       const mappedPromise = userCartItems.map((item) => {
//         return Product.findById(item.productid)
//         .then(products => {
//            if(products !==null) {
//             updatedCart.push({productid: item.productid, quantity: item.quantity})
//              return ({...products, quantity: item.quantity})
//            }
//         })
//       })
//       return Promise.all(mappedPromise)
//       .then(resolvedProducts => {
//         fetchedProducts = resolvedProducts.filter(Boolean)
//         const updatedProducts = {
//            items: updatedCart,
//            status: "pending"
//         }
//         return db.collection("users").updateOne(
//           {_id: this.id},
//           {$set: {cart: updatedProducts.items.length > 0 ? updatedProducts : []}}
//           )
//           .then(result => {
//             return fetchedProducts
//           })
//       })
//     })
//     .catch(err => {
//       console.log(err)
//     })
//   }

//    static findById(prodId){
//     const sProdId = String(prodId)
//     const db = getDb()
//     return db.collection("users").findOne({_id: new ObjectId(sProdId)})
//     .then(result => {
//       return result
//     })
//     .catch(err => { 
//      console.log(err)
//     })
//    }

//    deleteCart(prodId){

//     console.log(prodId, "prodId")

//     let userCartItems;

//      const db = getDb()

//      return db.collection("users").findOne({_id : this.id})
//      .then(user => {
//        userCartItems = user.cart.items
//        let updatedUserCartItems = [...userCartItems]
//        const filteredUserCartitems = updatedUserCartItems.filter(cp => {
//         return cp.productid !== prodId
//        })
//        console.log("file", filteredUserCartitems)
//        const updatedItems = {
//         items: filteredUserCartitems,
//         status: user.cart.status
//        }
//        if(filteredUserCartitems.length > 0){
//        return db.collection("users").updateOne(
//         {_id: this.id},
//         {$set: {cart: updatedItems}}
//         )
//         .then(result => {
//           return result
//         })
//        }
//      })
//      .catch(err => {
//       console.log("err", err)
//      })
//    }

//    addOrder(){
//      const cartItems = this.carts.items
     
//      const db = getDb()
     
//      console.log("d", db)

//      return db.collection("orders").insertOne({
//       userId: this.id,
//       items: cartItems,
//       status: "pending"
//      })
//      .then(order => {
//       return db.collection("users").updateOne(
//         {_id: this.id},
//         {$set: {cart: []}}
//       )
//       .then(result => {
//         return order
//       })
//      })
//      .catch(err => {
//       console.log(err)
//      })
//    }

//    getOrders(){
//     let userItems = []
//     const db = getDb()
//     return db.collection("orders").find({userId: this.id}).toArray()
//       .then(orders => {
//         orders.forEach(order => {
//           userItems.push(...order.items)
//         })
//         const mappedUserItems = userItems.map(item => {
//           return product.findById(item.productid)
//           .then(product => {
//              return {...item, ...product}
//           })`  
//         })
//         return Promise.all(mappedUserItems)
//         .then(items => {
//           console.log("i", items)
//           return items
//         })
//        })
//       .catch(err => {
//         console.log(err)
//       })  
// }
// }

// module.exports = User

//using Mongoose

const mongoose = require("mongoose")

const Product = require("../models/product")

const UserSchema = new mongoose.Schema({
   password: {
    type: String,
   },
   email:{
    type: String,
    required: true
   },
   resetToken: String,
   resetTokenExpiration: Date,
   cart:{
    items: [
      {
        productId: {
          type: mongoose.Types.ObjectId,
          ref: "product",
          required: true
        },
        quantity: {
          type: Number,
          required: true,
        }
      }
    ],
    status: String
   },
   is_active:{
    type: Boolean,
    default: false
   }
})

   UserSchema.methods.addToCart = function (prodId) {

    console.log(prodId, "product")

    //find index of the item in the cart

    console.log(this.cart.items, "items")

    const cartProductIndex = this.cart?.items?.findIndex(cb => {
        return cb.productId == prodId
    })

    console.log("index", cartProductIndex)

    let updatedUserCarts = [...this?.cart?.items]

    let newQuantity = 1

    if(cartProductIndex >= 0){
       newQuantity = this.cart.items[cartProductIndex].quantity + 1
       updatedUserCarts[cartProductIndex] = {...updatedUserCarts, productId: prodId, quantity: newQuantity}
    }

    else {
     updatedUserCarts.push({
        productId: prodId,
        quantity: newQuantity
     })
    } 

     const updatedCart = {
       items: updatedUserCarts,
       status: "active"
     }
 
     if(updatedCart){
       //update user cart
      this.cart = updatedCart

      return this.save()
     }
   }


   UserSchema.methods.getAllCart = async function () {

     let fetchedProducts

     const userCartItems = this.cart.items

     let updatedCart = []

     const mappedPromise = userCartItems.map( async (item) => {
              
              const product =  await Product.findById(item.productId)

                 if(product !==null) {
                  updatedCart.push({productid: item.productid, quantity: item.quantity})
                   return ({...product.toObject(), productId: item.productId.toString(), quantity: item.quantity})
                 }
            })

            return Promise.all(mappedPromise)
            .then(resolvedProducts => {
              //only getting values that are not null
              fetchedProducts = resolvedProducts.filter(Boolean)

              const updatedProducts = {
                 items: fetchedProducts,
                 status: "pending"
              }

             this.cart = updatedProducts
             this.save()
             return fetchedProducts
          
        })

   }

module.exports = mongoose.model("user", UserSchema)