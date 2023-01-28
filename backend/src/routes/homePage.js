const express = require('express')
const router = express.Router()

const {
    getAvailableProductsToBestsellerTable
} = require('../controllers/homePage')

router.get('/view/home-page/bestsellers', getAvailableProductsToBestsellerTable)


module.exports = router
