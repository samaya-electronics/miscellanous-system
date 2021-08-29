const express = require('express')
const router = express.Router()
const category = require('../controllers/categoriesController')
const { onlyPassRoles } = require('../middleware/authMiddleware')


router.get('/:id',onlyPassRoles('admin', 'superuser', 'teamleader', 'user'),category.getCategoryById)
router.get('/',onlyPassRoles('admin', 'superuser', 'teamleader', 'user'),category.getCategories)
router.post('/',onlyPassRoles('admin', 'superuser'),category.postCategory)
router.put('/:id',onlyPassRoles('admin', 'superuser'),category.updateCategory)
router.delete('/:id',onlyPassRoles('admin', 'superuser'),category.deleteCategory)

module.exports = router