const { Request, User,Item} = require('../models')


const getAllrequests = async(req,res)=>{
    try{ const request = await Request.findAll()
     res.json(request)
    }
    catch (err){
        console.log(err)
    }
 }


 const getrequestById = async (req,res)=>{
    try{
    const request = await Request.findByPk(parseInt(req.params.pk))
    res.json(request)
    }
    catch (err){
        console.log(err)
    }
}

const createrequest = async (req,res)=>{
    try {
        const request = await Request.create({
            quantity: req.body.quantity,
            user_requesting_id: req.body.user_requesting_pk,
            user_approving_id: req.body.user_approving_pk,
            item_id: req.body.item_pk
        })
        res.json(request)
    } 
    catch(err){
        console.log(err)
    }
}

const deleterequest = async (req,res)=>{
    try{await Request.destroy({
        where: {
            request_id: req.params.pk
        }
    })
    res.end()
}
    catch(err){
        console.log(err)
    }
}
   
module.exports = {
    getAllrequests,
    getrequestById,
    createrequest,
    deleterequest
}


