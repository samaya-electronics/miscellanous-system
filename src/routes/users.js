const express = require('express')
const router = express.Router()
const user = require('../controllers/userController')


router.get('/:id',user.getUserById)

router.get('/',user.getAllUsers)

router.post('/',user.createUser)

router.delete('/:id',user.deleteUser)


module.exports = router