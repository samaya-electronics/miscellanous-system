const express = require('express')
const stocksController = require('../controllers/stocksController')
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router()

// router.get('/', )

module.exports = router