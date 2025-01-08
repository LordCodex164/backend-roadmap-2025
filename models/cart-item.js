const Sequelize = require("sequelize")

const sequelize = require("../utils/db")

const CartItem = sequelize.define("cartitem", {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true,
    },
    quantity: Sequelize.INTEGER,
})

module.exports = CartItem