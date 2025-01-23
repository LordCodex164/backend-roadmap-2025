

exports.login = function (req, res) {
    res.render("auth/login", {pageTitle: "Login Page"})
}

exports.postLogin = function (req, res) {
    const {email, password} = req.body

    if(!email || !password){
        throw new Error("")
    }
    
    //we use the session middleware to add the session object to the request
    req.session.isLogged = true
    res.redirect("/")
}