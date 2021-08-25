const authServices = require("../database/services/authService")
var jwt = require('jsonwebtoken');
const loginPost = (req, res) => {
	if(!req.body.username){ res.json({err:{description: "no username"}})}
	const result = authServices.findByUserName(req.body.username)

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