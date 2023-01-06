const express = require('express')
const router = express.Router()

const {addingProduct} = require('../controllers/product')
const {addingProductValidator} = require('../validators/product')
const {runValidation} = require('../validators')

router.post('/adding/product', addingProductValidator, runValidation, addingProduct)

module.exports = router // by default it is empty object
