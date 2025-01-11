const Sequelize = require("sequelize")

const sequelize = require("../utils/db")

const OrderItem = sequelize.define("orderItem", {
   id:{
       type: Sequelize.INTEGER,
       autoIncrement: true,
       allowNull: true,
       primaryKey: true
   },
   quantity: Sequelize.INTEGER,
})

module.exports = OrderItem