const router = require('express').Router()
const userController = require('../controllers/userController');
const Authentication = require("../middleware/auth");


router.route("/register").post(userController.registerUser)
router.route("/login").post(userController.loginUser)
router.route("/logout").get(userController.logoutUser)
router.route("/password/forgot").post(userController.forgotPassword)
router.route("/me").get(Authentication.isAuthenticatedUser, userController.getUserDetails)
router.route("/me/update").post(Authentication.isAuthenticatedUser, userController.updateUserProfile)
router.route("/admin/users").get(Authentication.isAuthenticatedUser,Authentication.authorizeRoles("admin"),userController.getAllUser)
router.route("/admin/user/:id").get(Authentication.isAuthenticatedUser,Authentication.authorizeRoles("admin"),userController.getSingleUser)

module.exports = router