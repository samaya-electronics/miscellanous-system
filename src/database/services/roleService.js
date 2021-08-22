const { Role } = require('../models')

const createRole = async (name) => {
    const result = {}
    try{
        result.role = await Role.create({
            name: name
        })
        result.msg = "Role Created"
    }
    catch(err){
        result.err = err
        result.msg = "Could not create role, try again later."
    }
    return result
}


const getRoles = async () => {
    const result = {}
    try{
        result.roles = await Role.findAll()
        result.msg = "Got all roles"
    }
    catch(err){
        result.err = err
        result.msg = "Could not get all roles"
    }
    return result
}

const getRoleById = async (id) => {
   const result = {}
    try{
        result.role = await Role.findByPk(parseInt(id))
        result.msg = "Got role"
    }
    catch(err){
        result.err = err
        result.msg = "Could not get role"
    }
    return result
}

const updateRole = async (name, id) => {
    const result = {}
    try{
        const role = await Role.findByPk(id)
        result.role = await role.update({name: name})
        result.msg = "Updated role"
    }
    catch(err){
        result.err = err
        result.msg = "Could not update role"
    }
    return result
}

const deleteRole = async (id) => {
   const result = {}
    try{
        result.role = await Role.findByPk(id)
        result.role.destroy()
        result.msg = "Deleted role"
    }
    catch(err){
        result.err = err
        result.msg = "Could not delete role"
    }
    return result
}

module.exports = {
    createRole,
    getRoles,
    getRoleById,
    updateRole,
    deleteRole,
}