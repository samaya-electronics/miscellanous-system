const { User } = require('../models')

const createUser = async (name, username, role_id,user_manager_id) => {
    const result = {}
    try{
        result.user = await User.create({
            name: name,
            username: username,
            role_id: role_id,
            user_manager_id: user_manager_id
        })
        result.msg = "User Created"
    }
    catch(err){
        result.err = err
        result.msg = "Could not create user, try again later."
    }
    return result
}



const getUsers = async () => {
    const result = {}
    try{
        result.users = await User.findAll()
        result.msg = "Got all users"
    }
    catch(err){
        result.err = err
        result.msg = "Could not get all users"
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

 const updateUser = async (id, name, username, role_id,user_manager_id) => {
    const result = {}
    try{
        const user = await User.findByPk(id)
        result.user = await category.update({name: name , username: username ,role_id: role_id, user_manager_id: user_manager_id})
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
 
 module.exports = {
     createUser,
     getUsers,
     getUserById,
     updateUser,
     deleteUser,
 }