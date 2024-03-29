const express = require('express')
const router = express.Router()

const {addingProductValidator} = require('../validators/product')
const {runValidation} = require('../validators')
const {
    addingProduct,
    getAvailableProduct, updateDelivery,
    getAvailableProductDetails, getAvailableProductsList,
    getAvailableAnimalTypes, getAvailableProductToEdit,
    getAvailableAnimalBreeds, updateProductDetails,
    getAvailableAnimalAges, deleteProductFromShop,
    getAvailableAnimalWeights, updatePromotion, getAvailableProductsSaleList
} = require('../controllers/product')


router.post('/adding/product', addingProductValidator, runValidation, addingProduct)
router.get('/adding/product', getAvailableProductDetails)
router.get('/view/products-list', getAvailableProductsList)
router.get('/view/products-sale-list', getAvailableProductsSaleList)

router.get('/adding/product/animalType', getAvailableAnimalTypes)
router.get('/adding/product/breed', getAvailableAnimalBreeds)
router.get('/adding/product/age', getAvailableAnimalAges)
router.get('/adding/product/weight', getAvailableAnimalWeights)

router.get('/view/products', getAvailableProduct)
router.get('/view/products-edit', getAvailableProductToEdit)

router.put('/update/product-sale', updatePromotion)
router.put('/update/product-delivery', updateDelivery)
router.put('/update/product-detail', updateProductDetails)

router.delete('/delete/product-from-shop', deleteProductFromShop)

module.exports = router // by default it is empty object
