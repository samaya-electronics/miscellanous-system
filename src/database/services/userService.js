const { User, Role } = require('../models')
const jwt = require('jsonwebtoken');

const createUser = async (name, role_id, user_manager_id,email) => {
    const result = {}
    try{
        result.user = await User.create({
            name,
            role_id,
            user_manager_id,
            email
        })
        result.msg = "User Created"
    }
    catch(err){
        result.err = err
        result.msg = "Could not create user, try again later."
    }
    return result
}

const getUserById = async (id) => {
    const result = {}
     try{
         result.user = await User.findByPk(parseInt(id))
         result.msg = "Got user"
     }
     catch(err){
         result.err = err
         result.msg = "Could not get user"
     }
     return result
 }

 const updateUser = async (id, name, role_id, user_manager_id, email) => {
    const result = {}
    try{
        const user = await User.findByPk(id)
        result.user = await user.update({
            name,
            role_id,
            user_manager_id,
            email
        })
        result.msg = "Updated user"
    }
    catch(err){
        result.err = err
        result.msg = "Could not update User"
    }
    return result
}

const deleteUser = async (id) => {
    const result = {}
     try{
         result.user = await User.findByPk(id)
         result.user.destroy()
         result.msg = "Deleted user"
     }
     catch(err){
         result.err = err
         result.msg = "Could not delete user"
     }
     return result
}

const generateUserToken = async (username) => {
    const result = {}
    try{
        const user = await User.findOne({
            where: { name: username },
            include: Role
        })
        if(!user) throw new Error('user not found')

        result.token = jwt.sign({user_id: user.user_id},  process.env.SECRET_KEY, { expiresIn: '8h' });
        
        user.token = result.token
        await user.save()
        
        result.links = user.Role.name === "admin" ? ['/store','/requests'] : ['/store'] 
        
        result.msg = "Got user"
    }
    catch(err){
        result.err = err
        result.msg = "Could not get user"
    }
    return result
}

const logoutUser = async (user) => {
    result = {}
    try{
        user.token = null
        await user.save()
        result.msg = "User logged out successfully"
    }
    catch(err){
        result.err = err
        result.msg = "User logout error"
    }
    return result
}
 
module.exports = {
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    generateUserToken,
    logoutUser,
}