const express = require("express")

const authController = require("../controllers/auth")

const router = express.Router()

const createCrsfToken = require('../middleware/crsfToken');

const {body, check} = require("express-validator")

router.get("/login", 
    createCrsfToken, 
    authController.login)

router.post("/login",

    [
        check("email")
        .isEmail()
        .withMessage("Please enter a valid email"),
    
        body(
            "password",
            "Please enter a password with only numbers and text and at least 5 characters"
        )
         .isAlphanumeric()
         .isLength({min: 5})
        .trim()
    ],

    authController.postLogin)

router.post("/logout", 
    authController.postlogout
) 

router.get(
    "/signup", 
    createCrsfToken,
    authController.signup)

router.post(
    "/signup",

    [
    check("email")
    .isEmail()
    .withMessage("Please enter a valid email"),

    // body(
    //     "password",
    //     "Please enter a password with only numbers and text and at least 5 characters"
    // )
    //  .isAlphanumeric()
    //  .isLength({min: 5})
    // .trim(),
    
    // body
    // ("confirmPassword")
    // .custom((value, { req }) => {
    //     if(value !== req.body.password) {
    //         throw new Error ("Passwords do not match")
    //     }
    //     return;
    // })
    
    ],
    
    authController.postSignUp
)

router.get("/resetEmail", 
    createCrsfToken, 
    authController.getResetEmail
)
router.post("/resetEmail",  authController.postResetEmail)
router.get("/resetPassword/:token", createCrsfToken, authController.postResetEmail)

module.exports = router