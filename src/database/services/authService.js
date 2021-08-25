const { User } = require('../models')

const findByUserName = async (username) => {
    const result = {}
    try{
        result.user = await User.findOne({ where: { name: username } })
        if(!result.user) throw new Error('user not found')
        result.msg = "Got user"
    }
    catch(err){
        result.err = err
        result.msg = "Could not get user"
    }
    return result
}

module.exports = {
    findByUserName
} 