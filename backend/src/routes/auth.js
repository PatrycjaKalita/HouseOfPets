const express = require('express')
const router = express.Router()

const {userSignupValidator, userSigninValidator} = require('../validators/auth')
const {runValidation} = require('../validators')
const {signup, signin} = require('../controllers/auth')

router.post('/signup', userSignupValidator, runValidation, signup)
router.post('/signin', userSigninValidator, runValidation, signin)

module.exports = router // by default it is empty object
