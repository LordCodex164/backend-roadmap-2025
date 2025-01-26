const User = require("../models/user")

exports.login = function (req, res) {

    const isLoggedIn = req.session.user
    res.render("auth/login", {pageTitle: "Login Page", isAuthenticated: isLoggedIn})

}

exports.postLogin = function (req, res) {

    const {email, password} = req.body
    
    if(!email || !password){
        throw new Error("")
    }

    //we use the session middleware to add the session object to the request

    User.findById("678fd1f8b9b4841380f7ef06")
       .then(user => {
        req.session.user = user
        req.session.isLogged = true
        req.session.save(err => {

            if(!err){
             return res.redirect("/")
            }

        })
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

exports.postSignUp = (req, res, next) => {
        
}