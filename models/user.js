const {Sequelize} = require("sequelize")

const sequelize = require("../utils/db")

const User = sequelize.define("User", {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
    },
    email: Sequelize.STRING
})

module.exports = User