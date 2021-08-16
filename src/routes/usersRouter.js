const express = require('express')
const router = express.Router()
const user = require('../controllers/userController')


router.get('/:PK',user.getUserById)

router.get('/',user.getAllUsers)

router.post('/',user.createUser)

router.delete('/:PK',user.deleteUser)


module.exports = router