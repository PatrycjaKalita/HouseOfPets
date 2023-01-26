const express = require('express')
const router = express.Router()

const {requireSignin} = require("../controllers/auth");
const {updateCart} = require("../controllers/cart");

router.patch('/user/update-cart',requireSignin, updateCart)

module.exports = router
