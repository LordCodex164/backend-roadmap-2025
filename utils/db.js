const {Sequelize} = require("sequelize")

//here we set up the sql connection on our application and get back a connection 
//object that allows us to run queries.

//connections are to be closed after a query.

//so ideally, it is 

const sequelize = new Sequelize("backend-course", "root", "polish416#", {
    dialect: "mysql",
    host: "localhost"
})

module.exports = sequelize