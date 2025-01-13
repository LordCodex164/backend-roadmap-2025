const express = require('express')

const hbs = require("express-handlebars")

const errorController = require('./controllers/404')

require("dotenv").config()

const app = express()

//routes
// const shopRoutes = require('./routes/shop')
const adminRoutes = require('./routes/admin')
// const cartRoutes = require("./routes/cart")
// const orderRoutes = require("./routes/order")
const bodyParser = require('body-parser')
const methodOverride = require('method-override') 
const {mongoConnect, getDb} = require("./utils/db")

// app.engine('hbs', hbs({layoutDir: "views/layouts", extname: "hbs", defaultLayout: "main-layout"}))

app.engine("ejs", require("ejs").__express) 

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({ extended: false }))


//for every incoming request
app.use((req, res, next) => {
   console.log("This will always run!")
   next()
})

// app.use(shopRoutes)
app.use("/admin", adminRoutes.routes)
// app.use("/cart", cartRoutes)
// app.use("/order", orderRoutes)
// app.use(errorController.get404)


mongoConnect(client => {
    app.listen(3000, () => {
        console.log("listening on Port 3000")
    })
})