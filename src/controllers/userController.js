const userServices = require('../database/services/userService')

const getUsers = async(req, res)=>{
    const result = await userServices.getUsers()

    res.json({
        err: result.err,
        msg: result.msg,
        Users: result.Users
    })
}

const postUser = async (req, res)=>{
    const result = await userServices.createUser(req.body.name, req.body.username, req.body.role_id, req.body.user_manager_id)

    res.json({
        err: result.err,
        msg: result.msg,
        user: result.user
    })
}

const getUserById = async (req, res)=>{
    const result = await userServices.getUserById(req.params.id)

    res.json({
        err: result.err,
        msg: result.msg,
        user: result.user
    })
}

const updateUser = async (req, res)=>{
    const result = await userServices.updateUser(req.body.name,req.body.userName, req.body.role_id, req.body.user_manager_id, req.params.id)

    res.json({
        err: result.err,
        msg: result.msg,
        user: result.user
    })
}

const deleteUser = async (req, res)=>{
    const result = await userServices.deleteUser(req.params.id)

    res.json({
        err: result.err,
        msg: result.msg,
        user: result.user
    })
}

module.exports = {
    getUserById,
    postUser,
    updateUser,
    deleteUser,
    getUsers
}