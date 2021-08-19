const categoryServices = require('../database/services/categoryService')

const getCategories = async(req, res)=>{
    const result = await categoryServices.getCategories()

    res.json({
        err: result.err,
        msg: result.msg,
        categories: result.categories
    })
}

const postCategory = async (req, res)=>{
    const result = await categoryServices.createCategory(req.body.name)

    res.json({
        err: result.err,
        msg: result.msg,
        category: result.category
    })
}

const getCategoryById = async (req, res)=>{
    const result = await categoryServices.getCategoryById(req.params.id)

    res.json({
        err: result.err,
        msg: result.msg,
        category: result.category
    })
}

const updateCategory = async (req, res)=>{
    const result = await categoryServices.updateCategory(req.body.name, req.params.id)

    res.json({
        err: result.err,
        msg: result.msg,
        category: result.category
    })
}

const deleteCategory = async (req, res)=>{
    const result = await categoryServices.deleteCategory(req.params.id)

    res.json({
        err: result.err,
        msg: result.msg,
        category: result.category
    })
}

module.exports = {
    getCategoryById,
    postCategory,
    updateCategory,
    deleteCategory,
    getCategories
}