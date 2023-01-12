const express = require('express')
const router = express.Router()

const {addingProductValidator} = require('../validators/product')
const {runValidation} = require('../validators')
const {addingProduct, getAvailableProductDetails} = require('../controllers/product')

router.post('/adding/product', addingProductValidator, runValidation, addingProduct)
router.get('/adding/product', getAvailableProductDetails)

module.exports = router // by default it is empty object
