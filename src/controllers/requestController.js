const requestServices = require('../database/services/requestService')

const getRequests = async(req, res)=>{
    const result = await requestServices.getRequests()

    res.json({
        err: result.err,
        msg: result.msg,
        requests: result.requests
    })
 }


 const getRequestById = async (req, res)=>{
    const result = await requestServices.getRequestById(req.params.id)

    res.json({
        err: result.err,
        msg: result.msg,
        request: result.request
    })
}

const createRequest = async (req, res)=>{
    const result = await requestServices.createRequest(
        req.body.quantity,
        req.body.item_id,
        req.body.user_requesting_id,
        req.body.user_approving_id
    )

    res.json({
        err: result.err,
        msg: result.msg,
        request: result.request
    })
}

const deleteRequest = async (req, res)=>{
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


