const authServices = require("../database/services/authService")
var jwt = require('jsonwebtoken');

const loginPost = async (req, res) => {
	let result = {}
	if(req.body.username){
		result = await authServices.findByUserName(req.body.username)
		result.token = jwt.sign({ user: result.user },  process.env.SECRETKEY, { expiresIn: '8h' });
	}
	else{
		result = { err: {description: "no username"}}
	}
	res.json({
		msg: result.msg,
		token: result.token,
		links:['/store','/requests'],
		err: result.err
	})
	// take in the username and password
	// check if they are true and get info from ldap
	// check if they are in local db
	// if true then creat jwt
	// save session refresh token and other user data if not present in database
	// return jwt with expiration date token to user
	// else return err 
}

module.exports = {
	loginPost,
}