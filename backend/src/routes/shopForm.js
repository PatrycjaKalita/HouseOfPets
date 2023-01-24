const express = require('express')
const router = express.Router()

const {
    getAvailableCategories, getAvailableBreeds, getAvailableAges, getAvailableWeights, postProductsList
} = require('../controllers/shopForm')

router.get('/view/categories', getAvailableCategories)
router.get('/view-shop-form/breed', getAvailableBreeds)
router.get('/view-shop-form/age', getAvailableAges)
router.get('/view-shop-form/weight', getAvailableWeights)

router.post('/view-shop-form/post', postProductsList)

module.exports = router // by default it is empty object
