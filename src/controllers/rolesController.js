const roleServices = require('../database/services/roleService')

const getRoles = async(req, res)=>{
    const result = await roleServices.getRoles()

    res.json({
        err: result.err,
        msg: result.msg,
        roles: result.roles
    })
}

const postRole = async (req, res)=>{
    const result = await roleServices.createRole(req.body.role_name)

    res.json({
        err: result.err,
        msg: result.msg,
        role: result.role
    })
}

const getRoleById = async (req, res)=>{
    const result = await roleServices.getRoleById(req.params.id)

    res.json({
        err: result.err,
        msg: result.msg,
        role: result.role
    })
}

const updateRole = async (req, res)=>{
    const result = await roleServices.updateRole(req.body.role_name, req.params.id)

    res.json({
        err: result.err,
        msg: result.msg,
        role: result.role
    })
}

const deleteRole = async (req, res)=>{
    const result = await roleServices.deleteRole(req.params.id)

    res.json({
        err: result.err,
        msg: result.msg,
        role: result.role
    })
}

const getRoleUsers = async (req, res) => {
    const result = await roleServices.getRoleUsers(req.params.id)

    res.json({
        err: result.err,
        msg: result.msg,
        users: result.users
    })
}

module.exports = {
    getRoleById,
    postRole,
    updateRole,
    deleteRole,
    getRoles,
    getRoleUsers
}