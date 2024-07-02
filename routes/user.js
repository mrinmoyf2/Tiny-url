const express = require('express')
const { handleUserSignup, handleUserLogin, handelUserLogOut } = require('../controllers/user')

const router = express.Router()

router.post('/', handleUserSignup)
router.post('/login', handleUserLogin)
router.post('/logout', handelUserLogOut)

module.exports = router