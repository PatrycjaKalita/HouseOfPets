const express = require('express')
const router = express.Router()

const {requireSignin} = require("../controllers/auth");
const {updateCart, getAvailableCart} = require("../controllers/cart");

router.patch('/user/update-cart',requireSignin, updateCart)

router.get('/user/get-cart/:id',requireSignin, getAvailableCart)

module.exports = router
