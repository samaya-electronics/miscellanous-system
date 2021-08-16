const express = require('express')
const router = express.Router()
const request = require('../controllers/requestController')

router.get('/:pk',request.getrequestById)

router.get('/',request.getAllrequests)

router.post('/',request.createrequest)

router.delete('/:pk',request.deleterequest)


module.exports = router