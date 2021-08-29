const jwt = require('jsonwebtoken');
const { User, Role } = require('../database/models');

// TODO
// clean up this god forsaken function
const onlyPassRoles = (...roles) =>{
	return async (req, res, next) => {
		try{
			if(!roles.includes(req.body.user.Role.name)) throw new Error("User role not permitted")

			next()
		}
		catch(err){
			return res.json({
				err
			})
		}
	}
} 

const authenticateToken = async (req, res, next) => {
	try{
		let user = jwt.verify(req.body.token, process.env.SECRET_KEY)
		user = await User.findByPk(user.user_id, {include : Role})
		if(user.token !== req.body.token) throw new Error("Invalid user token")
		if(user.name !== req.body.username) throw new Error("Invalid username")
		
		req.body.user = user
		next()
	}
	catch(err){
		return res.json({
			err
		})
	}
}

module.exports = {
	onlyPassRoles,
	authenticateToken
}