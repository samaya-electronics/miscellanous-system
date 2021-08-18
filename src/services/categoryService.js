const { Category } = require('../models')

const createCategory = async (data) => {
    const result = {}
    try{
        const category = await Category.create({
            name: data.name
        })
        result.category = category,
        result.msg = "Category Created"
    }
    catch(err){
        result.err = err
        result.msg = "Could not create Category, try again later."
    }
    return result
}


// const getCategories = async () => {
//     try{
//         const categories = await Category.findAll()
//     }
//     catch(err){
//         return
//     }
// }

module.exports = {
    createCategory,
}