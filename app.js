const express = require('express')

const hbs = require("express-handlebars")

const errorController = require('./controllers/404')

const app = express()

const sequelize = require("./utils/db")

//routes
const shopRoutes = require('./routes/shop')
const adminRoutes = require('./routes/admin')
const bodyParser = require('body-parser')

// app.engine('hbs', hbs({layoutDir: "views/layouts", extname: "hbs", defaultLayout: "main-layout"}))

app.engine("ejs", require("ejs").__express) 

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(shopRoutes)
app.use("/admin", adminRoutes.routes)
app.use(errorController.get404)


sequelize.sync()
.then(result => {
 //console.log("res", result)
 app.listen(3000, () => {
    console.log("Server is running on port 8000")
}) 
})
.catch(err => {
    console.log("err", err)
})
