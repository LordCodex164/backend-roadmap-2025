const express = require('express')

const hbs = require("express-handlebars")

const errorController = require('./controllers/404')

require("dotenv").config()

const app = express()

//routes
const shopRoutes = require('./routes/shop')
const adminRoutes = require('./routes/admin')
const cartRoutes = require("./routes/cart")
const orderRoutes = require("./routes/order")
const authRoutes = require("./routes/auth")
const bodyParser = require('body-parser')
const methodOverride = require('method-override') 
const {mongoConnect, getDb} = require("./utils/db")
const User = require("./models/user")
const session = require("express-session")
const MongoDbStore = require("connect-mongodb-session")(session)
const csrf = require("csurf")
const flash = require("connect-flash")

// app.engine('hbs', hbs({layoutDir: "views/layouts", extname: "hbs", defaultLayout: "main-layout"}))

app.engine("ejs", require("ejs").__express) 

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({ extended: false }))

const store = new MongoDbStore({
    uri: process.env.MONGO_URL,
    collection: "sessions",
})


//configuring our store where we store our session
app.use(
    session({
     secret: "my secret key", 
     resave: false, 
     saveUninitialized: false, 
     store
    })
)

const csrfProtection = csrf()

app.use(csrfProtection)

app.use(flash())

//for every incoming request
app.use((req, res, next) => {
   console.log("This will always run!")
   if(!req.session.user){
     return next()
   }
   User.findById(req.session.user._id)
   .then(user => {
     req.user = user
     next()
   })
   .catch(err => {
    console.log(err)
   })
})

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn
    // const token = req.csrfToken()
    // res.locals.csrfToken = token
    // req.session.csrftoken = token
    // console.log("cr", req.session.csrfToken)
    // //res.locals.csrfToken = req.csrfToken()
    next() 
})

app.use((err, req, res, next) => {
    if (err.code === 'EBADCSRFTOKEN') {
        return res.status(403).send('Invalid CSRF token.');
    }
    next(err);
});


app.use(shopRoutes)
app.use("/admin", adminRoutes.routes)
app.use("/cart", cartRoutes)
app.use("/order", orderRoutes)
app.use("/auth", authRoutes)
// app.use(errorController.get404)

mongoConnect(client => {
    //console.log(client)
    app.listen(3000, () => {
        console.log("listening on Port 3000")
    })
})