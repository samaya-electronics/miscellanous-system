const express = require('express')
const authController = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/login', authController.loginPost)
router.delete('/logout', authMiddleware.authenticateToken, authController.logoutController)

module.exports = router