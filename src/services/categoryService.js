const { Category } = require('../models')

const createCategory = async (data) => {

    try{
        const category = await Category.create({
            name: data.name
        })
        return {
            category: category,
            msg: "Category Created"
        }
    }
    catch(err){
        return {
            err: err,
            msg: "Could not create Category, try again later."
        }
    }
    
}
