const userService = require("../database/services/userService")

const loginPost = async (req, res) => {

	const result = await userService.findByUserName(req.body.username)
	// TODO:
	// check if they are true and get info from ldap
	// check password too
	// save session token and other user data if not present in database
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