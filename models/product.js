//using mongodb driver

// const getDb = require("../utils/db").getDb
// const { ObjectId } = require("mongodb")

// class Product {
//     constructor(title, description, price, imageUrl, id, userId, userCarts){
//       this.title = title,
//       this.description = description,
//       this.price = price,
//       this.imageUrl = imageUrl
//       this.id = id
//       this.userId = userId
//       this.userCarts = userCarts
//     }

//     save(){
//       const db = getDb()
//       if(this.id !== null){
//         const sProdId = String(id)
//         return db.collection("products").updateOne({_id: new ObjectId(sProdId)}, {$set: {...this}})
//       }
//       return db.collection("products").insertOne(this)
//       .then(result => {
//         console.log("product created")
//         return result
//       })
//       .catch(err => {
//         console.log(err)
//       })
//     }

//     static fetchAll(){
//       const db = getDb()
//       return db.collection("products").find().toArray()
//       .then(result => {
//          return result
//       })
//       .catch(err => {
//         console.log(err)
//       })
//     }
    
//     static findById(prodId){
//       const sProdId = String(prodId)
//       const db = getDb()
//       return db.collection("products").find({_id: new ObjectId(sProdId)}).next()
//       .then(result => {
//          return result
//       })
//       .catch(err => {
//         console.log(err)
//       })
//     }

//     addToCart(prodId){

//      //find index of the item in the cart

//      const cartProductIndex = this.userCarts.items.findIndex(cb => {
//          return cb.productid == prodId
//      })

//      let updatedUserCarts = [...this.userCarts.items]

//      let newQuantity = 1

//      if(cartProductIndex >= 0){
//         newQuantity = this.userCarts.items[cartProductIndex].quantity + 1
//         updatedUserCarts[cartProductIndex] = {productid: prodId, quantity: newQuantity}
//      }
//      else {
//       updatedUserCarts.push({
//          productid: prodId,
//          quantity: newQuantity
//       })
//      }  

//       const updatedCart = {
//         items: updatedUserCarts,
//         status: "active"
//       }

//       if(updatedCart){
//         const db = getDb()

//       return db.collection("users").updateOne(
//         {_id: new ObjectId(String(this.userId))},
//         {$set: {cart: updatedCart}}
//       )
//       .then(result => {
//         return result
//       })
//       .catch(err => {
//         console.log(err)
//       })
//       }
//     }
//     static update (prodId, updateditem){
//       console.log(prodId)
//       const sProdId = String(prodId)
//       const db = getDb()
//       return db.collection("products").updateOne({_id: new ObjectId(sProdId)}, {$set: {...updateditem}})
//       .then(result => {
//          return result
//       })
//       .catch(err => {
//         console.log(err)
//       })
//     }

//     static delete(prodId){
//       const sProdId = String(prodId)
//       const db = getDb()
//       return db.collection("products").deleteOne({_id: new ObjectId(sProdId)})
//       .then(result => {
//          return result
//       })
//       .catch(err => {
//         console.log(err)
//       })
//     }
// }

// exports.product = Product


//using mongoose

const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  price:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  imageUrl:{
    type: String,
    required: true
  },
  userId:{
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "user"
  }
})

module.exports = mongoose.model("Product", ProductSchema)