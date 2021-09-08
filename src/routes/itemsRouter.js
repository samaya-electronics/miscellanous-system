const express = require('express')
const router = express.Router()
const itemsController = require('../controllers/itemsController')
const { onlyPassRoles } = require('../middleware/authMiddleware')

router.get('/', onlyPassRoles('admin', 'superuser', 'teamleader', 'user') ,itemsController.getItems)
router.get('/search', onlyPassRoles('admin', 'superuser', 'teamleader', 'user') , itemsController.searchItems)
// router.get('/:id/stocks', onlyPassRoles('admin', 'superuser'), itemsController.getStocksByItem)
router.get('/:id', onlyPassRoles('admin', 'superuser', 'teamleader', 'user') , itemsController.getItemById)
router.post('/', onlyPassRoles('admin', 'superuser') , itemsController.postItem)
router.delete('/:id', onlyPassRoles('admin', 'superuser') , itemsController.deleteItem)
router.put('/:id', onlyPassRoles('admin', 'superuser') , itemsController.updateItem)

module.exports = router