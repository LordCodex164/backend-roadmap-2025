const Sequelize = require("sequelize")

const sequelize = require("../utils/db")

const Cart = sequelize.define("cart", {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true,
    },
})

module.exports = Cart