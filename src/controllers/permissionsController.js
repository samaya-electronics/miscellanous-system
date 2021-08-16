const { Permission } = require('../models')

// get categories // get
const getpermissions = async(req,res)=>{
    const p = await Permission.findAll()
    res.json(p)
}

//get category by PK // get
const getpermissionsById = async (req,res)=>{
    try{
    const p = await Permission.findByPk(parseInt(req.params.PK))
    res.json(p)
    }
    catch (err){
        console.log(err)
    }
}

//create category // post
const createPermission = async (req,res)=>{
    try {
        const p = await Permission.create({
            name: req.body.name
        })
        res.json(p)
    } 
    catch(err){
        console.log(err)
    }
}

// update // post
const updatePermission = async (req,res)=>{
    try{
        const p = await Permission.update({
        name: req.body.name
    },{
        where: {category_id: req.params.PK }
    })
    res.json(p)
    console.log(p)
    }
    catch(err){
        console.log(err)
    }
}

// delete BY PK
const deletePermission = async (req,res)=>{
    try{await Permission.destroy({
        where: {
            category_id: req.params.PK
        }
    })
    res.end()
}
    catch(err){
        console.log(err)
    }
}
   


module.exports = {
     getpermissions,
     createPermission,
     updatePermission,
     deletePermission,
     getpermissionsById
}