const { User } = require('../models')
const jwt = require('jsonwebtoken');

const createUser = async (name, role_id, user_manager_id) => {
    const result = {}
    try{
        result.user = await User.create({
            name,
            role_id,
            user_manager_id
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

 const updateUser = async (id, name, role_id, user_manager_id) => {
    const result = {}
    try{
        const user = await User.findByPk(id)
        result.user = await user.update({
            name,
            role_id,
            user_manager_id,
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
        result.user = await User.findOne({ where: { name: username } })
        if(!result.user) throw new Error('user not found')

        result.token = jwt.sign({ user: result.user },  process.env.SECRET_KEY, { expiresIn: '8h' });

        result.user.token = result.token
        await user.save()
        
        result.msg = "Got user"
    }
    catch(err){
        result.err = err
        result.msg = "Could not get user"
    }
    return result
}

const saveUserToken = async (user, token) => {
    try{
        user.token = token
        await user.save()
    }
    catch(err){
        return err
    }
}
 
module.exports = {
     createUser,
     getUsers,
     getUserById,
     updateUser,
     deleteUser,
     saveUserToken,
     generateUserToken,
}