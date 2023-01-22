const express = require('express')
const router = express.Router()

const {addingProductValidator} = require('../validators/product')
const {runValidation} = require('../validators')
const {
    addingProduct,
    getAvailableProduct,
    getAvailableProductDetails,getAvailableProductsList,
    getAvailableAnimalTypes,
    getAvailableAnimalBreeds,
    getAvailableAnimalAges,
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
router.put('/update/product-sale', updatePromotion)

module.exports = router // by default it is empty object
