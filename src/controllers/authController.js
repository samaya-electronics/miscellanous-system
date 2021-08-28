const userService = require("../database/services/userService")

const loginPost = async (req, res) => {

	const result = await userService.generateUserToken(req.body.username)
	// TODO:
	// check if they are true and get info from ldap
	// check password too
	// save session token and other user data if not present in database
	// if error happens anywhere there is no need to carry on so please clean up this mess

	res.json({
		msg: result.msg,
		token: result.token,
		links: result.links,
		err: result.err
	})
}

const logoutController = async (req, res) => {
	// log out user by deactivating his token
	res.json({
		msg: "msg",
		err: "err",
	})
}

module.exports = {
	loginPost,
	logoutController
}