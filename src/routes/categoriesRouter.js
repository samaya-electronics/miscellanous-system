const express = require('express')
const router = express.Router()
const category = require('../controllers/categoriesController')


router.get('/:pk',category.getCategoryById)

router.get('/',category.getCategories)

router.post('/',category.postCategory)

router.put('/:pk',category.updateCategory)

router.delete('/:pk',category.deleteCategory)


module.exports = router

