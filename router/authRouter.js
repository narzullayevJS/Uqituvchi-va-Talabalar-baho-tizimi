const express = require("express")
const router = express.Router()
const {Regester, login} = require("../controller/authController")

router.post("/register", Regester)
router.post("/login", login)

module.exports = router
