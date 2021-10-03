const { Category } = require('../models')

const createCategory = async (name) => {
    const result = {}
    try{
        result.category = await Category.create({
            name: name
        })
        result.msg = "Category Created"
    }
    catch(err){
        result.err = err
        result.msg = "Could not create Category, try again later."
    }
    return result
}


const getCategories = async () => {
    const result = {}
    try{
        result.categories = await Category.findAll()
        result.msg = "Got all categories"
    }
    catch(err){
        result.err = err
        result.msg = "Could not get all categories"
    }
    return result
}

const getCategoryById = async (id) => {
   const result = {}
    try{
        result.category = await Category.findByPk(parseInt(id))
        result.msg = "Got category"
    }
    catch(err){
        result.err = err
        result.msg = "Could not get category"
    }
    return result
}

const getCategoryItems = async (id) => {
    const result = {}
     try{
         result.category = await Category.findByPk(parseInt(id))
         result.items = await result.category.getItems()
         result.msg = "Got category"
     }
     catch(err){
         result.err = err
         result.msg = "Could not get category"
     }
     return result
 }

const updateCategory = async (name, id) => {
    const result = {}
    try{
        const category = await Category.findByPk(id)
        result.category = await category.update({name: name})
        result.msg = "Updated Category"
    }
    catch(err){
        result.err = err
        result.msg = "Could not update category"
    }
    return result
}

const deleteCategory = async (id) => {
   const result = {}
    try{
        result.category = await Category.findByPk(id)
        result.category.destroy()
        result.msg = "Deleted Category"
    }
    catch(err){
        result.err = err
        result.msg = "Could not delete category"
    }
    return result
}

module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    getCategoryItems,
    deleteCategory,
}