const express = require('express')
const router = express.Router()
const category = require('../controllers/categoriesController')


router.get('/:PK',category.getCategoryById)

router.get('/',category.getCategories)

router.post('/',category.createCategory)

router.put('/:PK',category.updateCategory)

router.delete('/:PK',category.deleteCategory)


module.exports = router

