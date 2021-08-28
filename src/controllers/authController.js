const userService = require("../database/services/userService")

const loginPost = async (req, res) => {

	const result = await userService.generateUserToken(req.body.username)
	// TODO:
	// check if they are true and get info from ldap
	// check password too
	// save user data if not present in database

	res.json({
		msg: result.msg,
		token: result.token,
		links: result.links,
		err: result.err
	})
}

const logoutController = async (req, res) => {
	const result = await userService.logoutUser(req.body.user)

	res.json({
		msg: result.msg,
		err: result.err
	})
}

module.exports = {
	loginPost,
	logoutController
}