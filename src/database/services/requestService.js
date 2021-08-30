const { Request, User } = require('../models')

const createRequest = async (quantity, item_id, user) => {
    const result = {}
    try{
        result.request = await Request.create({
            quantity: quantity,
            item_id: item_id,
            user_requesting_id: user.user_id,
            leader_approved: (user.Role.name !== 'user'), // if he is not a user then he is a leader or higher
            superuser_approved: (user.Role.name === 'superuser')
        })
        result.msg = "Request Created"
    }
    catch(err){
        result.err = err
        result.msg = "Could not create request"
    }
    return result
}

const getAllRequests = async () => {
    result = {}
    try{
        result.requests = await Request.findAll()
        result.msg = "Got all requests"
    }
    catch(err){
        result.msg = "Got all requests"
        result.err = err
    }
    return result
}

const approveRequest = async (request_id, userRole) => {
    result = {}
    try{
        result.request = await Request.findByPk(request_id)
        result.request.leader_approved = (userRole === 'teamleader')
        result.request.superuser_approved = (userRole === 'superuser')
        await result.request.save()
        result.msg = "Request approved"
    }
    catch(err){
        result.err = err
        result.msg = "Request not approved"
    }
    return result
}

const getSuperUserRequests = async (user) => {
    result = {}
    try{
        result.requests = await Request.findAll({
            where: {leader_approved: true}
        })
        result.msg = "Got all requests"
    }
    catch(err){
        result.msg = "Got all requests"
        result.err = err
    }
    return result
}

const getLeaderRequests = async (user) => {
    result = {}
    result.requests = []
    try{
        const teamMembers = await User.findAll({
            where: {user_leader_id: user.user_id}
        })
        for await (const [i, member] of teamMembers.entries()){
            const memberRequests = await member.getRequests()
            result.requests.push(...memberRequests)
        }
        const ownRequests = await user.getRequests()
        result.requests.push(...ownRequests)
        result.msg = "Got all requests"
    }
    catch(err){
        result.msg = "Got all requests"
        result.err = err
    }
    return result
    
}
const getUserRequests = async (user) => {
    const result = {}
    try{
        result.requests = await user.getRequests()
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

const deleteRequest = async (req_id, user) => {
    const result = {}
    try{
        result.request = await Request.findByPk(req_id)
        const userRequests = await user.getRequests()
        if(!userRequests.includes(result.request)) throw new Error("Not permitted to delete request")
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
    getAllRequests,
    getLeaderRequests,
    getSuperUserRequests,
    getUserRequests,
    getRequestById,
    approveRequest,
    deleteRequest
}