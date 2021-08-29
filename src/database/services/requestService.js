const { Request, User } = require('../models')

const createRequest = async (quantity, item_id, user_requesting_id) => {
    const result = {}
    try{
        result.request = await Request.create({
            quantity: quantity,
            item_id: item_id,
            user_requesting_id: user_requesting_id
        })
        result.msg = "Request Created"
    }
    catch(err){
        result.err = err
        result.msg = "Could not create request"
    }
    return result
}

const getRequests = async () => {
    const result = {}
    try{
        result.requests = await Request.findAll()
        result.msg = "Got all requests"
    }
    catch(err){
        result.err = err
        result.msg = "Could not get all requests"
    }
    return result
}

const getLeaderRequests = async (user) => {
    const result = {}

    result.requests = []
    try{
        const teamMembers = await User.findAll({
            where: {user_leader_id: user.user_id}
        })
        for await (const [i, member] of teamMembers.entries()){
            const memberRequests = await member.getRequests()
            result.requests.push(...memberRequests)
        }
        result.msg = "Got all requests"
    }
    catch(err){
        result.err = err
        result.msg = "Could not get all requests"
    }
    return result
}

const getRequestById = async (id) => {
    const result = {}
    try{
        result.request = await Request.findByPk(parseInt(id))
        result.msg = "Got request"
    }
    catch(err){
        result.err = err
        result.msg = "Could not get request"
    }
    return result
}

const deleteRequest = async (id) => {
    const result = {}
    try{
        result.request = await Request.findByPk(id)
        result.request.destroy()
        result.msg = "Deleted request"
    }
    catch(err){
        result.err = err
        result.msg = "Could not delete request"
    }
    return result
 }
 

module.exports = {
    createRequest,
    getRequests,
    getRequestById,
    getLeaderRequests,
    deleteRequest
}