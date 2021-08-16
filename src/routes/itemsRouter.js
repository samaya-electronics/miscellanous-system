const express = require('express')
const router = express.Router()
const itemsController = require('../controllers/itemsController')

router.get('/', itemsController.getItems)
router.get('/:pk', itemsController.getItemBypk)
router.post('/', itemsController.createItem)
router.delete('/:pk', itemsController.deleteItem)
router.put('/:pk', itemsController.updateItem)

module.exports = router