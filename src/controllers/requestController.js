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
    const request = await Request.findByPk(parseInt(req.params.PK))
    res.json(request)
    }
    catch (err){
        console.log(err)
    }
}

const createrequest = async (req,res)=>{
    try {
        const request = await Request.create({
            quntity: req.body.quntity,
            approved: false,
            user_requesting_id:req.body.user_requesting_PK,
            user_approving_id:req.body.user_approving_PK,
            role_id:req.body.role_PK
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
            request_id: req.params.PK
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


