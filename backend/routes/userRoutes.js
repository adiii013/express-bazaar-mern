const router = require('express').Router()
const userController = require('../controllers/userController')

router.route("/register").post(userController.registerUser)
router.route("/login").post(userController.loginUser)
router.route("/logout").get(userController.logoutUser)
router.route("/password/forgot").post(userController.forgotPassword)
module.exports = router