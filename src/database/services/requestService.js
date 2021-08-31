const { Request, User } = require('../models')

const createRequest = async (quantity, item_id, user) => {
    const result = {}
    let leader_approved = null
    let superuser_approved = null

    if(user.Role.name !== 'user'){
        leader_approved = true
    }
    else if(user.Role.name === 'superuser'){
        superuser_approved = true
    }

    try{
        result.request = await Request.create({
            quantity: quantity,
            item_id: item_id,
            user_requesting_id: user.user_id,
            leader_approved: leader_approved, // if he is not a user then he is a leader or higher
            superuser_approved: superuser_approved
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


const getAllDeliveries = async () => {
    result = {}
    try{
        result.requests = await Request.findAll({
            where:{leader_approved : true, 
                   superuser_approved : true,
                   delivered: null}
              })
        result.msg = "Got all deliveries"
    }
    catch(err){
        result.msg = "Could not Got all deliveries"
        result.err = err
    }
    return result
}

const approveRequest = async (request_id, userRole) => {
    result = {}
    try{
        result.request = await Request.findByPk(request_id)
        if(userRole === 'teamleader'){
            result.request.leader_approved  = true
        }
        else if(userRole === 'superuser'){
            result.request.superuser_approved = true
        }
        else{
            throw new Error("Unknown role trying to approve a request")
        }
        await result.request.save()
        result.msg = "Request approved"
    }
    catch(err){
        result.err = err
        result.msg = "Request not approved"
    }
    return result
}

const approveDelivery = async (request_id, approved) => {
    result = {}
    try{
        result.request = await Request.findByPk(request_id)
        result.request.delivered = approved
        result.item = await result.request.getItem()
        if(approved){
            result.item.quantity = result.item.quantity - result.request.quantity
            await result.item.save()
        }
        await result.request.save()
        result.msg = "Request delivered"
    }
    catch(err){
        result.err = err
        result.msg = "Request not delivered"
    }
    return result
}

const rejectRequest = async (request_id, userRole) => {
    result = {}
    try{
        result.request = await Request.findByPk(request_id)
        if(userRole === 'teamleader'){
            result.request.leader_approved  = false
        }
        else if(userRole === 'superuser'){
            result.request.superuser_approved = false
        }
        else{
            throw new Error("Unknown role trying to reject a request")
        }
        await result.request.save()
        result.msg = "Request rejected"
    }
    catch(err){
        result.err = err
        result.msg = "Request could not be rejected"
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
        result.request = await Request.findOne({
            where: {
                request_id: req_id,
                user_requesting_id: user.user_id
            }
        })
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
    getAllDeliveries,
    getLeaderRequests,
    getSuperUserRequests,
    getUserRequests,
    getRequestById,
    approveDelivery,
    approveRequest,
    rejectRequest,
    deleteRequest
}