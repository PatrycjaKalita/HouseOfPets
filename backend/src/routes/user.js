const express = require('express')
const router = express.Router()

const { requireSignin, adminMiddleware } = require('../controllers/auth');
const {read, update, getAvailableUsersList, deleteUser} = require('../controllers/user')

router.get('/user/list', getAvailableUsersList)
router.get('/user/:id',requireSignin, read)

router.put('/user/update',requireSignin, update)
router.put('/pracownik/update',requireSignin, adminMiddleware, update)

router.delete('/delete/user',requireSignin, deleteUser)

module.exports = router // by default it is empty object
