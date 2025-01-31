const User = require("../models/user")
const bcrypt = require("bcrypt-nodejs")


exports.login = function (req, res) {

    const isLoggedIn = req.session.isLoggedIn
    res.render("auth/login", {pageTitle: "Login Page", isAuthenticated: isLoggedIn, errorMessage: req.flash("error")})

}

exports.postLogin = function (req, res) {

    console.log(req.body.email)

    const {email, password} = req.body
    
    if(!email || !password){

        throw new Error("")

    }

    //we use the session middleware to add the session object to the request

    User.findOne({email: email}).then(user => {

        console.log("user", user)

        if(!user){
            req.flash("error", "Invalid email or password")
            return res.redirect("/auth/login")
        }

        const isMatch = bcrypt.compareSync(password, user.password)

            console.log("isMatch", isMatch)
            if(isMatch){ 
                req.session.isLoggedIn = true
                req.session.user = user
                return req.session.save(err => {
                    console.log(err)
                    res.redirect("/")
                })
            }
            res.redirect("/auth/login")

    })
    .catch(err => {
        console.log("err", err)
    })
}

exports.postlogout = function (req, res) {

     req.session.destroy(err => {
        console.log(err, "err")
        if(!err){
            req.session = null
            res.redirect("/")
        }
     })

}

exports.signup = function (req, res) {
    res.render("auth/signup", {pageTitle: "Signup Page", errorMessage: req.flash("error")})
}

exports.postSignUp = (req, res, next) => {

    console.log(req.body)

    const {email, password, confirmPassword} = req.body

    User.findOne({
        email: email 
    }).then(userDoc => {
        if(userDoc){
            req.flash("error", "Account already exists") 
            return res.redirect("/auth/signup")
        }
        
        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(8))

        const user = new User({
            email: email,
            password: hashedPassword,
            cart: {
                items: []
            }
        }) 
        return user.save()
    .then(result => {
        res.redirect("/auth/login")
    })
    }).catch(err => {
        console.log(err)
    })

    if(password !== confirmPassword){
        req.flash("error", "Passwords do not match")
        return res.redirect("/auth/signup")
    }
}