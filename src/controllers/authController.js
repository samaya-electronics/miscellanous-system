const authServices = require("../database/services/authService")
var jwt = require('jsonwebtoken');

const loginPost = async (req, res) => {

	const result = await authServices.findByUserName(req.body.username)
	result.token = jwt.sign({ user: result.user },  process.env.SECRET_KEY, { expiresIn: '8h' });

	res.json({
		msg: result.msg,
		token: result.token,
		links:['/store','/requests'],
		err: result.err
	})
	// check if they are true and get info from ldap
	// check password too
	// save session refresh token and other user data if not present in database
}

module.exports = {
	loginPost,
}