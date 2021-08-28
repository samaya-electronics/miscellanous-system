const express = require('express')
const authController = require('../controllers/authController')
const router = express.Router()

router.post('/login', authController.loginPost)
router.post('/logout', authController.logoutController)

module.exports = router