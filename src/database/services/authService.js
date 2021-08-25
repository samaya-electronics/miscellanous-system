const { User } = require('../models')

const findByUserName = async (username) => {
    const result = {}
    try{
        result.user = await User.findOne({ where: { username: username } })
        result.msg = "Got user"
        if(!result.user) throw new Error('user not found')
    }
    catch(err){
        result.err = err
        result.msg = "Could not get all users"
    }
    return result
}

module.exports = {
    findByUserName
} 