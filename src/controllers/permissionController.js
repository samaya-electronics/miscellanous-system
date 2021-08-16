const { Per } = require('../models')

// get categories // get
const getpermissions = async(req,res)=>{
   try {
    const permissions = await Per.findAll()
    res.json(permissions)
   }
   catch (err){
       console.log(err)
   }
}

//get permissions by PK // get
const getpermissionsById = async (req,res)=>{
    try{
    const permissions = await Per.findByPk(parseInt(req.params.id))
    res.json(permissions)
    }
    catch (err){
        console.log(err)
    }
}

//create permissions // post
const createpermissions = async (req,res)=>{
    try {
        const permissions = await Per.create({
            name: req.body.name
        })
        res.json(permissions)
    } 
    catch(err){
        console.log(err)
    }
}

// update // post
const updatepermissions = async (req,res)=>{
    try{await Per.update({
        name: req.body.name
    },{
        where: { permissions_id: req.params.PK }
    })
    res.end()
    }
    catch(err){
        console.log(err)
    }
}

// delete BY PK
const deletepermissions = async (req,res)=>{
    try{await Per.destroy({
        where: {
            permissions_id: req.params.PK
        }
    })
    res.end()
}
    catch(err){
        console.log(err)
    }
}
   


module.exports = {
     getpermissionsById,
     createpermissions,
     updatepermissions,
     deletepermissions,
     getpermissions,
}