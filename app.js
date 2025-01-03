const express = require('express')

const hbs = require("express-handlebars")

const app = express()

// app.engine('hbs', hbs({layoutDir: "views/layouts", extname: "hbs", defaultLayout: "main-layout"}))

app.engine("ejs", require("ejs").__express)

app.set('view engine', 'ejs')
app.set('views', 'views')

const shopRoutes = require('./routes/shop')
const adminRoutes = require('./routes/admin')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(shopRoutes)
app.use("/admin", adminRoutes.routes)
app.use((req, res, next) => {
    res.render("404", {pageTitle: "Page not found"})
})

app.listen(3000, () => {
    console.log("Server is running on port 8000")
})