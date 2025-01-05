const {Sequelize, DataTypes} = require('sequelize');

const sequelize = require("../utils/db")

const Product = sequelize.define("Product", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: Sequelize.STRING,
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false 
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false  
    }
}) 


module.exports = Product
