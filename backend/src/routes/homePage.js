const express = require('express')
const router = express.Router()

const {
    getAvailableProductsToBestsellerTable, getAvailableAnimalsToSlider
} = require('../controllers/homePage')

router.get('/view/animals-in-slider', getAvailableAnimalsToSlider)
router.get('/view/home-page/bestsellers', getAvailableProductsToBestsellerTable)


module.exports = router
