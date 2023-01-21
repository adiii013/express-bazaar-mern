const express = require("express");
const productController = require("../controllers/productController");
const Authentication = require("../middleware/auth");

const router = express.Router();

router
  .route("/products")
  .get(productController.getAllProducts);
router
  .route("/admin/products/new")
  .post(Authentication.isAuthenticatedUser, Authentication.authorizeRoles("admin") , productController.createProduct);
router
  .route("/admin/products/:id")
  .put(Authentication.isAuthenticatedUser, Authentication.authorizeRoles("admin") , productController.updateProduct)
  .delete(Authentication.isAuthenticatedUser, Authentication.authorizeRoles("admin") , productController.deleteProduct)
router.route("/products/:id").get(productController.getProductDetails);

module.exports = router;
