const express = require('express')

const hbs = require("express-handlebars")

const errorController = require('./controllers/404')

const app = express()

const sequelize = require("./utils/db")

//routes
const shopRoutes = require('./routes/shop')
const adminRoutes = require('./routes/admin')
const cartRoutes = require("./routes/cart")
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const Product = require("./models/product")
const User = require("./models/user")
const Cart = require("./models/cart")
const CartItem = require("./models/cart-item")

// app.engine('hbs', hbs({layoutDir: "views/layouts", extname: "hbs", defaultLayout: "main-layout"}))

app.engine("ejs", require("ejs").__express) 

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({ extended: false }))


//for every incoming request
app.use((req, res, next) => {
    User.findByPk(1)
    .then(user => {
        req.user = user;
        next()
    })
    .catch(err => {
        console.log(err)
    })
})

app.use(shopRoutes)
app.use("/admin", adminRoutes.routes)
app.use("/cart", cartRoutes)
app.use(errorController.get404)

//one to one relationship
Product.belongsTo(User, {constraints: true, onDelete: "CASCADE"})

//one to many relationship
User.hasMany(Product)

//one to one relationship

//we have this 

User.hasOne(Cart)

//many to many relationship

Cart.belongsToMany(Product, {through: CartItem})
Product.belongsToMany(Cart, {through: CartItem})


//creating our dummy object 
sequelize.sync()
.then(result => {
 //console.log("res", result)
  return User.findByPk(1)
  .then(user => {
    if(!user){
       return User.create({name: "test", email: "test@gmail.com"})
    }
    return Promise.resolve(user)
  })
  .then(user => {
    return user.createCart()
  })
  .then(cart => {
    app.listen(3000, () => {
        console.log("Server is running on port 8000")
    }) 
}) 
})
.catch(err => {
    console.log("err", err)
})