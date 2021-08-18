const categoryServices = require('../services/categoryService')

// get categories // get
const getCategories = async(req,res)=>{
   try{ const category = await Category.findAll()
    res.json(category)
   }
   catch (err){
       console.log(err)
   }
}

//get category by PK // get
const getCategoryById = async (req,res)=>{
    try{
    const category = await Category.findByPk(parseInt(req.params.pk))
    res.json(category)
    }
    catch (err){
        console.log(err)
    }
}

//create category // post
const postCategory = async (req, res)=>{
    const result = await categoryServices.createCategory({
        name: req.body.name
    })

    res.json({
        err: result.err,
        msg: result.msg,
        category: result.category
    })
}

// update // post
const updateCategory = async (req,res)=>{
    try{
        const result = await Category.update({
        name: req.body.name
    },{
        where: {category_id: req.params.pk }
    })
    res.json(result)
    }
    catch(err){
        console.log(err)
    }
}

// delete BY PK
const deleteCategory = async (req,res)=>{
    try{await Category.destroy({
        where: {
            category_id: req.params.pk
        }
    })
    res.end()
}
    catch(err){
        console.log(err)
    }
}
   


module.exports = {
     getCategoryById,
     postCategory,
     updateCategory,
     deleteCategory,
     getCategories
}