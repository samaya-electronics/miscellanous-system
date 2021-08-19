const express = require('express')
const router = express.Router()
const itemsController = require('../controllers/itemsController')

router.get('/', itemsController.getItems)
router.get('/:id', itemsController.getItemById)
router.post('/', itemsController.postItem)
router.delete('/:id', itemsController.deleteItem)
router.put('/:id', itemsController.updateItem)

module.exports = router