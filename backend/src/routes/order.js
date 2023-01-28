const express = require('express')
const router = express.Router()

const {requireSignin} = require("../controllers/auth");
const {
    addingOrder,
    getAvailableNewOrder,
    getAvailableClientListOfOrders,
    getAvailableOrder,
    getAvailableOrdersList, updateOrderStatus
} = require("../controllers/order");
const {updatePromotion} = require("../controllers/product");

router.post('/user/make-order', requireSignin, addingOrder)

router.get('/user/view-new-order/:id', requireSignin, getAvailableNewOrder)
router.get('/user/view-orders-list/:email', requireSignin, getAvailableClientListOfOrders)
router.get('/user/view-order/:id', requireSignin, getAvailableOrder)

router.get('/employee/view-orders-list', requireSignin, getAvailableOrdersList)

router.put('/update/order-status', requireSignin, updateOrderStatus)

module.exports = router
