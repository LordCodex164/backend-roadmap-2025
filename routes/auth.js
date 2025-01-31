const express = require("express")

const authController = require("../controllers/auth")

const router = express.Router()

router.get("/login", authController.login)
router.post("/login", authController.postLogin)
router.post("/logout", authController.postlogout)
router.get("/signup", authController.signup)
router.post("/signup", authController.postSignUp)

module.exports = router