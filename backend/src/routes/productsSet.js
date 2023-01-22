const express = require('express')
const router = express.Router()

const {
    addingProductsSet, getAvailableProductsSetList, getAvailableProductsSet
} = require('../controllers/productsSet')

router.post('/adding/products-set', addingProductsSet)

router.get('/view/products-set-list', getAvailableProductsSetList)
router.get('/view/products-set', getAvailableProductsSet)

module.exports = router // by default it is empty object
