const { Permission } = require('../models')

const createPermission = async (name) => {
    const result = {}
    try{
        result.permission = await Permission.create({
            name: name
        })
        result.msg = "Permission Created"
    }
    catch(err){
        result.err = err
        result.msg = "Could not create Permission, try again later."
    }
    return result
}


const getPermissions = async () => {
    const result = {}
    try{
        result.permissions = await Permission.findAll()
        result.msg = "Got all permissions"
    }
    catch(err){
        result.err = err
        result.msg = "Could not get all permissions"
    }
    return result
}

const getPermissionById = async (id) => {
   const result = {}
    try{
        result.permission = await Permission.findByPk(parseInt(id))
        result.msg = "Got Permission"
    }
    catch(err){
        result.err = err
        result.msg = "Could not get Permission"
    }
    return result
}

const updatePermission = async (name, id) => {
    const result = {}
    try{
        const permission = await Permission.findByPk(id)
        result.permission = await permission.update({name: name})
        result.msg = "Updated Permission"
    }
    catch(err){
        result.err = err
        result.msg = "Could not update Permission"
    }
    return result
}

const deletePermission = async (id) => {
   const result = {}
    try{
        result.permission = await Permission.findByPk(id)
        result.permission.destroy()
        result.msg = "Deleted Permission"
    }
    catch(err){
        result.err = err
        result.msg = "Could not delete Permission"
    }
    return result
}

module.exports = {
    createPermission,
    getPermissions,
    getPermissionById,
    updatePermission,
    deletePermission,
}