const express = require('express')
const router = express.Router()
const user = require('../controllers/userController')


router.get('/:pk',user.getUserById)

router.get('/',user.getAllUsers)

router.post('/',user.createUser)

router.delete('/:pk',user.deleteUser)


module.exports = router