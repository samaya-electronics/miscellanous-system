const jwt = require('jsonwebtoken');

const authenticateToken = (...roles) =>{
	return (req, res, next) => {
		try{
			req.user = jwt.verify(req.body.token, process.env.SECRET_KEY).user // you have to specify what you want out of the token (.user)
			if(roles.includes(req.user.Role.name)){
				next()
			}
			else{
				throw new Error("Not permitted")
			}
		}
		catch(err){
			return res.json({
				err
			})
		}
	}
} 

module.exports = {
	authenticateToken,
}