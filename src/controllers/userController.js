const userServices = require('../database/services/userService')

const postUser = async (req, res)=>{
    const result = await userServices.createUser(
        req.body.username,
        req.body.role_id,
        req.body.user_manager_id
    )

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
    const result = await userServices.updateUser(
        req.params.id,
        req.body.username,
        req.body.role_id,
        req.body.user_manager_id,
    )

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
}