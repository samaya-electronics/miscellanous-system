const userService = require("../database/services/userService")
var jwt = require('jsonwebtoken');

const loginPost = async (req, res) => {

	// TODO:
	// check if they are true and get info from ldap
	const result = await userService.findByUserName(req.body.username)
	// check password too
	result.token = jwt.sign({ user: result.user },  process.env.SECRET_KEY, { expiresIn: '8h' });
	// save session token and other user data if not present in database
	result.err = userService.saveUserToken(result.user, result.token)
	// if error happens anywhere there is no need to carry on so please clean up this mess

	res.json({
		msg: result.msg,
		token: result.token,
		links:['/store','/requests'],
		err: result.err
	})
}

module.exports = {
	loginPost,
}