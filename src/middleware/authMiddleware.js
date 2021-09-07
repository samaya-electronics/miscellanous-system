const jwt = require('jsonwebtoken');
const { User, Role } = require('../database/models');

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
		const authorization = req.headers.authorization
		const username = req.headers.username
		if(!authorization) throw new Error("No Authorization Header")
		if(!username) throw new Error("No username Header")

		const token = authorization?.split("Bearer ")[1]
		let user = jwt.verify(token, process.env.SECRET_KEY)
		user = await User.findByPk(user.user_id, {include : Role})

		if(user.token !== token) throw new Error("Invalid user token")
		if(user.name !== req.headers.username) throw new Error("Invalid username")
		
		req.body.user = user
		next()
	}
	catch(err){
		return res.json({
			err: err.toString()
		})
	}
}

module.exports = {
	onlyPassRoles,
	authenticateToken
}