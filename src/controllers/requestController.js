const requestServices = require('../database/services/requestService')

const getRequests = async(req, res) => {
    const userRole = req.body.user.Role.name
    let result
    
    if(userRole === 'admin'){
        result = await requestServices.getAllRequests(req.body.user)
    }
    else if(userRole === 'superuser'){
        result = await requestServices.getSuperUserRequests(req.body.user)
    }
    else if(userRole === 'teamleader'){
        result = await requestServices.getLeaderRequests(req.body.user)
    }
    else if(userRole === 'user'){
        result = await requestServices.getUserRequests(req.body.user)
    }
    else{
        result.err = new Error("Unknown Role")
        result.msg = "Unknown Role"
    }

    res.json({
        err: result.err,
        msg: result.msg,
        requests: result.requests
    })
 }

 const getRequestById = async (req, res) => {
    const result = await requestServices.getRequestById(req.params.id)

    res.json({
        err: result.err,
        msg: result.msg,
        request: result.request
    })
}

const createRequest = async (req, res) => {
    const result = await requestServices.createRequest(
        req.body.quantity,
        req.body.item_id,
        req.body.user,
    )

    res.json({
        err: result.err,
        msg: result.msg,
        request: result.request
    })
}

const deleteRequest = async (req, res) => {
    const result = await requestServices.deleteRequest(req.params.id)

    res.json({
        err: result.err,
        msg: result.msg,
        request: result.request
    })
}
   
module.exports = {
    getRequests,
    getRequestById,
    createRequest,
    deleteRequest
}


