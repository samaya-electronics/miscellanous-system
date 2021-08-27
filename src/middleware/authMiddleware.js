const jwt = require('jsonwebtoken');

const authenticateToken = (...roles) =>{
	return (req, res, next) => {
		try{
			req.user = jwt.verify(req.body.token, process.env.SECRETE_TOKEN)
			if(roles.includes(req.user.role.name)){
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