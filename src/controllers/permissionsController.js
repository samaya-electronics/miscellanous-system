const permissionServices = require('../database/services/permissionService')

const getPermissions = async(req, res)=>{
    const result = await permissionServices.getPermissions()

    res.json({
        err: result.err,
        msg: result.msg,
        permission: result.permission
    })
}

const postPermission = async (req, res)=>{
    const result = await permissionServices.createPermission(req.body.name)

    res.json({
        err: result.err,
        msg: result.msg,
        permission: result.permission
    })
}

const getPermissionById = async (req, res)=>{
    const result = await permissionServices.getPermissionById(req.params.id)

    res.json({
        err: result.err,
        msg: result.msg,
        permission: result.permission
    })
}

const updatePermission = async (req, res)=>{
    const result = await permissionServices.updatePermission(req.body.name, req.params.id)

    res.json({
        err: result.err,
        msg: result.msg,
        permission: result.permission
    })
}

const deletePermission = async (req, res)=>{
    const result = await permissionServices.deletePermission(req.params.id)

    res.json({
        err: result.err,
        msg: result.msg,
        permission: result.permission
    })
}

module.exports = {
    getPermissionById,
    postPermission,
    updatePermission,
    deletePermission,
    getPermissions
}