const User = require("../models/user")
const bcrypt = require("bcrypt-nodejs")
const crypto = require("crypto")
const sendEmail = require("../utils/sendEmail")
const {validationResult} = require("express-validator")

exports.login = function (req, res) {

    const isLoggedIn = req.session.isLoggedIn


    res.render("auth/login", {pageTitle: "Login Page", isAuthenticated: isLoggedIn, errorMessage: req.flash("error")})

}

exports.postLogin = function (req, res) {

    const {email, password} = req.body
    
    if(!email || !password){

        throw new Error("")

    }

    const errors = validationResult(req)

    const errors_ = Object.values(errors.errors).map(value => value.msg).join(", ")

    if(errors_) {
        req.flash("error", errors_)
        return res.status(412).redirect("/auth/signup")
    }


    //we use the session middleware to add the session object to the request

    User.findOne({email: email}).then(user => {

        console.log("user", user)

        if(!user){
            req.flash("error", "Invalid email or password")
            return res.redirect("/auth/login")
        }

        const isMatch = bcrypt.compareSync(password, user.password)  
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

  if(req.body._csrf === req.session.csrfToken){
     req.session.destroy(err => {
        console.log(err, "err")
        if(!err){
            req.session = null
            return res.redirect("/")
        }
     })
    }
    else {
      res.status = 403
      req.flash("error", "Invalid crsf token")
      return res.redirect("/")
    }

}

exports.signup = function (req, res) {
    const isLoggedIn = req.session.isLoggedIn
    res.render("auth/signup", {pageTitle: "Signup Page", isAuthenticated: isLoggedIn, errorMessage: req.flash("error")})
}

exports.postSignUp = (req, res, next) => {

    const {email, password, confirmPassword} = req.body

    const errors = validationResult(req)

    const errors_ = Object.values(errors.errors).map(value => value.msg).join(", ")

    if(errors_) {
        req.flash("error", errors_)
        return res.status(422).redirect("/auth/signup")
    }

    User.findOne({
        email: email 
    }).then(userDoc => {
        if(userDoc){

            req.flash("error", "Account already exists") 
            return res.redirect("/auth/signup")

        }
        
        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(8))

        const user = new User({
            password: hashedPassword,
            cart: {
                items: []
            }
        })
        console.log("u", user)
        return user.save()
    .then(result => {
        console.log("r", result)
        res.redirect("/auth/login")
    })
    }).catch(err => {
        console.log("test")
        next(err)
    })

    if(password !== confirmPassword){
        req.flash("error", "Passwords do not match")
        return res.redirect("/auth/signup")
    }
}

exports.getResetEmail = (req, res) => {
    const isLoggedIn = req.session.isLoggedIn
    res.render("auth/resetEmail", {pageTitle: "Reset Email", isAuthenticated: isLoggedIn, errorMessage: req.flash("error")})
}

exports.postResetEmail = async (req, res, next) => {

    const {email} = req.body

    if(!email){
       throw new Error ("Email Not found")
    }

    const user = await User.findOne({email})

    if(user){
        crypto.randomBytes(32, async (err, buffer) => {
            if(!err){
                const token = buffer.toString("hex")
                user.resetToken = token
                user.resetTokenExpiration = new Date() + 3600000
                const isModified = await user.save()

                if(isModified){
                   sendEmail({
                    to: email,
                    subject: "password reset",
                    text: `You requested for a password reset.
                    `,
                    html: `<p>here is your token ${token},<a href="http://localhost:3000/resetPassword/${token}">click this link to reset your password</a></p>`
                   })
                }
               req.flash("error", "otp sent to the user");
               return res.redirect("/auth/resetEmail")
            }
            return res.redirect("/auth/resetEmail")
        })
    }
}

exports.getResetPassword = async(req, res, next) => {

    const {token} = req.params

    const user = User.findOne({resetToken: token, resetTokenExpiration: {$gt: Date.now()}})

    const isLoggedIn = req.session.isLoggedIn

    if(!user){
     return res.redirect("/auth/login")
    }

    res.render("auth/resetPassword", {
        pageTitle: "Reset Password", 
        isAuthenticated: isLoggedIn, 
        errorMessage: req.flash("error"),
        email: user.email,
        token
    })

}

exports.postResetPassword = async (req, res, next) => {

    const {newPassword, token} = req.body

    const user = User.findOne({resetToken: token, resetTokenExpiration: {$gt: Date.now()}})

    if(user){
        user.password = newPassword,
        user.resetToken = undefined,
        user.resetTokenExpiration = undefined
        const isSaved = user.save()
        if(isSaved){
            req.flash("error", "you have successful reset your password")
            return res.redirect("auth/login")
        }
    }
    throw new Error("Something went wrong")
}