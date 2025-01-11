 const Sequelize = require("sequelize")

 const sequelize = require("../utils/db")

 const Order = sequelize.define("order", {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true
    }
 })

 module.exports = Order