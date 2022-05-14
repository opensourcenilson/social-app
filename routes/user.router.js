const router = require("express").Router()

const { register, login } = require("../controllers/user.controller")

router.route("/register").post(register)
router.route("/login").post(login)

module.exports = router
