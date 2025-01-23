const express = require("express")

const authController = require("../controllers/auth")

const router = express.Router()

router.get("/login", authController.login)
router.post("/login", authController.postLogin)

module.exports = router

