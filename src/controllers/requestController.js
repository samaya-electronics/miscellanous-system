const requestServices = require('../database/services/requestService')
const emailer = require('../helpers/emailService')

const getRequests = async(req, res) => {
    const userRole = req.body.user.Role.name
    let result
    
    if(userRole === 'admin'){
        result = await requestServices.getAllRequests()
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
        result.err = new Error("User Role not permitted")
        result.msg = "Unknown Role"
    }

    res.json({
        err: result.err,
        msg: result.msg,
        requests: result.requests
    })
 }


 const getDeliveries = async(req, res) => {
    const userRole = req.body.user.Role.name
    let result
    
    if(userRole === 'admin' || userRole === 'superuser'){
        result = await requestServices.getAllDeliveries()
    }
    else{
        result.err = new Error("Could not get deliveries")
        result.msg = "something want wrong"
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
    if(!result.err){

    if(req.body.user.Role.name === "superuser" || req.body.user.Role.name === "teamleader"){

        //emailer.sendRequestingMailToStore("email", result.request.item, req.body.user.name)
    }
    else if(req.body.user.Role.name ==="user"){

        //emailer.sendRequestingMailToLeader("email",result.request.item, req.body.user.name)
    } 
}

    res.json({
        err: result.err,
        msg: result.msg,
        request: result.request
    })
}

const approveRequest = async (req, res) => {
    const result = await requestServices.approveRequest(req.params.id, req.body.user.Role.name)

     if(!result.err){

        if(result.request.leader_approved  === true && result.request.superuser_approved === true){
            //emailer.sendApprovingMail("email", result.request.item, req.body.user.name )
        }
        else if(result.request.leader_approved  === true && result.request.superuser_approved === null){
            //emailer.sendRequestingMailToStore("email", result.request.item, req.body.user.name )
        }

     } 

    res.json({
        err: result.err,
        msg: result.msg,
        request: result.request
    })
}

const rejectRequest = async (req, res) => {
    const result = await requestServices.rejectRequest(req.params.id, req.body.user.Role.name)

    if(!result.err){

        if(result.request.leader_approved  === false || result.request.superuser_approved === false){
            //emailer.sendRejectionMail("email", result.request.item, req.body.user.name )
        }

     } 

    res.json({
        err: result.err,
        msg: result.msg,
        request: result.request
    })
}

const deliverRequest = async (req, res) => {
    let result // = await requestServices.approveDelivery(req.params.id, req.body.approved)

    // if(result.item.quantity <= result.item.threshold){
    //     // emailer.sendThresholdCautionMailToStore("email", result.item.name, req.body.user.name)
    // }

    res.json({
        err: result.err,
        msg: result.msg,
        request: result.request
    })
}

const deleteRequest = async (req, res) => {
    const result = await requestServices.deleteRequest(req.params.id, req.body.user)

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
    approveRequest,
    deliverRequest,
    rejectRequest,
    deleteRequest,
    getDeliveries
}


