const { Category } = require('../models')

// get categories // get
const getCategories = async(req,res)=>{
    const category = await Category.findAll()
    res.json(category)
}

//get category by PK // get
const getCategoryById = async (req,res)=>{
   const category = await Category.findByPk(parseInt(req.params.id))
   res.json(category)
}


//create category // post
const createCategory = async (req,res)=>{
    try {
        const category = await Category.create({
            name: req.body.name
        })
        res.json(category)
    } 
    catch(err){
        console.log(err)
    }
}

// update // post
const updateCategory = async (req,res)=>{
    await Category.update({
        name: req.body.name
    },{
        where: { category_id: req.params.id }
    })
    res.status(200).end()
}

// delete BY PK
const deleteCategory = async (req,res)=>{
    await Category.destroy({
        where: {
            category_id: req.params.id 
        }
    })

    res.status(200).end()
}
   


module.exports = {
     getCategoryById,
     createCategory,
     updateCategory,
     deleteCategory,
     getCategories
}