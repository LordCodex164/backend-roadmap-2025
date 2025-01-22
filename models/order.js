//  const Sequelize = require("sequelize")

//  const sequelize = require("../utils/db")

//  const Order = sequelize.define("order", {
//     id:{
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: true,
//         primaryKey: true
//     }
//  })

//  module.exports = Order


const mongoose = require("mongoose")

const User = require("../models/user")

const OrderSchema = new mongoose.Schema({
  status:{
    type: String
  },
  userId:{
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "user"
  },
  items: [
    {
        productId: {
            type:mongoose.Types.ObjectId,
            ref: "Product"
        },
        quantity: Number
    }
  ]
})

OrderSchema.methods.addOrder = async function (userId, cartItems) {

    console.log("items", cartItems)

    this.items = cartItems

    this.status = "pending"

    this.userId = userId

    const user = await User.findById(userId)

    if(!user) {
      throw new Error ("User not found")
    }

    const updatedUser = await User.findByIdAndUpdate(userId, {cart: []})

    if(updatedUser) {

    return this.save()

    }
}

module.exports = mongoose.model("Order", OrderSchema)