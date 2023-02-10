const express = require('express')
const router = express.Router()

const {
    addingProductsSet,
    getAvailableProductsSetList,
    getAvailableProductsSet,
    updatePromotion,
    deleteProductsSet,
    updateSet, updateDeliveryForSet,
    getAvailableProductsSetDetailsForUpdate
} = require('../controllers/productsSet')

router.post('/adding/products-set', addingProductsSet)

router.get('/view/products-set-list', getAvailableProductsSetList)
router.get('/view/products-set-update', getAvailableProductsSetDetailsForUpdate)
router.get('/view/products-set', getAvailableProductsSet)

router.put('/update/products-set-sale', updatePromotion)
router.put('/update/products-set', updateSet)
router.put('/update/products-set-delivery', updateDeliveryForSet)

router.delete('/delete/products-set', deleteProductsSet)

module.exports = router // by default it is empty object
