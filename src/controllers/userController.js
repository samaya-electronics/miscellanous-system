const { User } = require('../database/models')


const getAllUsers = async(req,res)=>{
    try{ const user = await User.findAll()
     res.json(user)
    }
    catch (err){
        console.log(err)
    }
 }


 const getUserById = async (req,res)=>{
    try{
    const user = await User.findByPk(parseInt(req.params.pk))
    res.json(user)
    }
    catch (err){
        console.log(err)
    }
}

const createUser = async (req,res)=>{
    try {
        const user = await User.create({
            name: req.body.name,
            username: req.body.username,
            role_id: req.body.pk
        })
        res.json(user)
    } 
    catch(err){
        console.log(err)
    }
}

const deleteUser = async (req,res)=>{
    try{await User.destroy({
        where: {
            user_id: req.params.pk
        }
    })
    res.end()
}
    catch(err){
        console.log(err)
    }
}
   
module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser
}


