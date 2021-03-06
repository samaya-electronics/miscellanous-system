const express = require('express')
const stocksController = require('../controllers/stocksController')
const { onlyPassRoles } = require('../middleware/authMiddleware')
const router = express.Router()

router.get('/', onlyPassRoles('admin', 'superuser'), stocksController.getStocks)
router.get('/:id', onlyPassRoles('admin', 'superuser'), stocksController.getStockById)
router.get('/:id/locations', onlyPassRoles('admin', 'superuser'), stocksController.getStockLocation)
router.post('/', onlyPassRoles('admin', 'superuser'), stocksController.postStock)
router.put('/:id', onlyPassRoles('admin', 'superuser'), stocksController.updateStock)
router.delete('/:id', onlyPassRoles('admin', 'superuser'), stocksController.deleteStock)

module.exports = router