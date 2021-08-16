const express = require('express')
const router = express.Router()
const request = require('../controllers/requestController')

router.get('/:id',request.getrequestById)

router.get('/',request.getAllrequests)

router.post('/',request.createrequest)

router.delete('/:id',request.deleterequest)


module.exports = router