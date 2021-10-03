const express = require('express')
const router = express.Router()
const  categoryController = require('../controllers/categoriesController')
const { onlyPassRoles } = require('../middleware/authMiddleware')


router.get('/:id',onlyPassRoles('admin', 'superuser', 'teamleader', 'user'), categoryController.getCategoryById)
router.get('/:id/items',onlyPassRoles('admin', 'superuser', 'teamleader', 'user'), categoryController.getCategoryItems)
router.get('/',onlyPassRoles('admin', 'superuser', 'teamleader', 'user'), categoryController.getCategories)
router.post('/',onlyPassRoles('admin', 'superuser'), categoryController.postCategory)
router.put('/:id',onlyPassRoles('admin', 'superuser'), categoryController.updateCategory)
router.delete('/:id',onlyPassRoles('admin', 'superuser'), categoryController.deleteCategory)

module.exports = router