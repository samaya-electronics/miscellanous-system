const {categories} = require('../models')

// get categories // get

const getCategories = async(req,res)=>{
    const category = await categories.findAll()
    res.json(category)
}

//get category byid // get

const getCategoryById = async (req,res)=>{
   const category= await categories.findById(req.params.id)
   res.json(category)
}


//create category // post

const createCategory = async (req,res)=>{
    try {
        const category = categories.create({
            name: req.body.name
        })
        res.status(200).json(category)
    } 
    catch(err){
        console.log(err)
    }
}

// update // post

const updateCategory= async (req,res)=>{
    try {
        const category = categories.update({
            name: req.body.name
        })
        res.status(200).json(category)
    } 
    catch(err){
        console.log(err)
    }
    
}


// delete BY ID

const deleteCategory = async (req,res)=>{
    const category= categories.destroy({
        where: { id: req.params.id }
    })

    res.json(category)
}
   


module.exports = {
     getCategoryById,
     createCategory,
     updateCategory,
     deleteCategory,
     getCategories


}