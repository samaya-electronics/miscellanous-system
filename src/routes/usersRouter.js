const express = require('express')
const router = express.Router()
const user = require('../controllers/userController')


router.get('/:id',user.getUserById)
router.get('/',user.getUsers)
router.post('/',user.postUser)
router.delete('/:id',user.deleteUser)
router.put('/id',user.updateUser)


module.exports = router