const express = require('express')
const router = express.Router()
const category = require('../controllers/categoriesController')


router.get('/:id',category.getCategoryById)

router.get('/',category.getCategories)

router.post('/',category.createCategory)

router.post('/:id',category.updateCategory)

router.delete('/:id',category.deleteCategory)


module.exports = router

