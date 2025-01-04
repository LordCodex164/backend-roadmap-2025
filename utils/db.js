const mySql = require("mysql2")

//here we set up the sql connection on our application and get back a connection 
//object that allows us to run queries.

//connections are to be closed after a query.

//so ideally, it is 

const pool = mySql.createPool({
    user: "root",
    host: "localhost",
    database: "backend-course",
    password: "polish416#"
})

module.exports = pool.promise();