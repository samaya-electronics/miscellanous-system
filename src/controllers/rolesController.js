const { Role } = require('../models')

// get categories // get
const getAllRoles = async(req,res)=>{
   try{ const role = await Role.findAll()
    res.json(role)
   }
   catch (err){
       console.log(err)
   }
}

//get Role by PK // get
const getRoleById = async (req,res)=>{
    try{
    const role = await Role.findByPk(parseInt(req.params.id))
    res.json(role)
    }
    catch (err){
        console.log(err)
    }
}

//create Role // post
const createRole = async (req,res)=>{
    try {
        const role = await Role.create({
            name: req.body.name
        })
        res.json(role)
    } 
    catch(err){
        console.log(err)
    }
}

// update // post
const updateRole = async (req,res)=>{
    try{await Role.update({
        name: req.body.name
    },{
        where: { Role_id: req.params.PK }
    })
    res.end()
    }
    catch(err){
        console.log(err)
    }
}

// delete BY PK
const deleteRole = async (req,res)=>{
    try{await Role.destroy({
        where: {
            Role_id: req.params.PK
        }
    })
    res.end()
}
    catch(err){
        console.log(err)
    }
}
   


module.exports = {
     getRoleById,
     createRole,
     updateRole,
     deleteRole,
     getAllRoles

}