const express = require('express')
const router = express.Router()
const requestController = require('../controllers/requestController')

router.get('/:id', requestController.getRequestById)
router.get('/', requestController.getRequests)
router.post('/', requestController.createRequest)
router.delete('/:id', requestController.deleteRequest)

module.exports = router