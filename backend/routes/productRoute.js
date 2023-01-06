const express = require('express')
const productController = require('../controllers/productController')
const isAuthenticatedUser = require('../middleware/auth')

const router = express.Router()

router.route('/products').get(isAuthenticatedUser,productController.getAllProducts)
router.route('/products/new').post(productController.createProduct)
router.route('/products/:id').put(productController.updateProduct).delete(productController.deleteProduct).get(productController.getProductDetails)

module.exports = router