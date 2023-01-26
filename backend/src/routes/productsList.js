const express = require('express')
const router = express.Router()

const {
    getAvailableCategoryDetails
} = require('../controllers/productsList')

router.get('/view/categories-details', getAvailableCategoryDetails)


module.exports = router
